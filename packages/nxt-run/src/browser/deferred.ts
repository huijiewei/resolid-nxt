import { AbortedDeferredError, UNSAFE_DeferredData as DeferredData } from '@remix-run/router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDeferredResponse = (response: any): boolean =>
  response instanceof Response && !!response.headers.get('Content-Type')?.match(/text\/nxt-deferred/);

const DEFERRED_VALUE_PLACEHOLDER_PREFIX = '__deferred_promise:';

export const parseDeferredReadableStream = async (stream: ReadableStream<Uint8Array>): Promise<DeferredData> => {
  if (!stream) {
    throw new Error('parseDeferredReadableStream requires stream argument');
  }

  let deferredData: Record<string, Promise<unknown>> | undefined;
  const deferredResolvers: Record<string, { resolve: (data: unknown) => void; reject: (error: unknown) => void }> = {};

  try {
    const sectionReader = readStreamSections(stream);

    // Read the first section to get the critical data
    const initialSectionResult = await sectionReader.next();
    const initialSection = initialSectionResult.value;

    if (!initialSection) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('no critical data');
    }

    const criticalData = JSON.parse(initialSection);

    // Setup deferred data and resolvers for later based on the critical data
    if (typeof criticalData === 'object' && criticalData !== null) {
      for (const [eventKey, value] of Object.entries(criticalData)) {
        if (typeof value !== 'string' || !value.startsWith(DEFERRED_VALUE_PLACEHOLDER_PREFIX)) {
          continue;
        }

        deferredData = deferredData || {};

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        deferredData[eventKey] = new Promise<any>((resolve, reject) => {
          deferredResolvers[eventKey] = {
            resolve: (value: unknown) => {
              resolve(value);
              delete deferredResolvers[eventKey];
            },
            reject: (error: unknown) => {
              reject(error);
              delete deferredResolvers[eventKey];
            },
          };
        });
      }
    }

    // noinspection ES6MissingAwait
    (async () => {
      try {
        for await (const section of sectionReader) {
          const [event, ...sectionDataStrings] = section.split(':');
          const sectionDataString = sectionDataStrings.join(':');
          const data = JSON.parse(sectionDataString);

          if (event === 'data') {
            for (const [key, value] of Object.entries(data)) {
              if (deferredResolvers[key]) {
                deferredResolvers[key].resolve(value);
              }
            }
          } else if (event === 'error') {
            for (const [key, value] of Object.entries(data) as Iterable<
              [string, { message: string; stack?: string }]
            >) {
              const err = new Error(value.message);
              err.stack = value.stack;
              if (deferredResolvers[key]) {
                deferredResolvers[key].reject(err);
              }
            }
          }
        }

        for (const [key, resolver] of Object.entries(deferredResolvers)) {
          resolver.reject(new AbortedDeferredError(`Deferred ${key} will never be resolved`));
        }
      } catch (error) {
        for (const resolver of Object.values(deferredResolvers)) {
          resolver.reject(error);
        }
      }
    })();

    return new DeferredData({ ...criticalData, ...deferredData });
  } catch (error) {
    for (const resolver of Object.values(deferredResolvers)) {
      resolver.reject(error);
    }

    throw error;
  }
};

const readStreamSections = async function* (stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();

  let buffer: Uint8Array[] = [];
  let sections: string[] = [];
  let closed = false;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readStreamSection = async () => {
    if (sections.length > 0) return sections.shift();

    // Read from the stream until we have at least one complete section to process
    while (!closed && sections.length === 0) {
      const chunk = await reader.read();
      if (chunk.done) {
        closed = true;
        break;
      }
      buffer.push(chunk.value);

      try {
        const bufferedString = decoder.decode(mergeArrays(...buffer));
        const splitSections = bufferedString.split('\n\n');
        if (splitSections.length >= 2) {
          sections.push(...splitSections.slice(0, -1));
          buffer = [encoder.encode(splitSections.slice(-1).join('\n\n'))];
        }
        if (sections.length > 0) {
          break;
        }
      } catch {
        // noinspection UnnecessaryContinueJS
        continue;
      }
    }

    if (sections.length > 0) {
      return sections.shift();
    }

    if (buffer.length > 0) {
      const bufferedString = decoder.decode(mergeArrays(...buffer));
      sections = bufferedString.split('\n\n').filter((s) => s);
      buffer = [];
    }

    return sections.shift();
  };

  let section = await readStreamSection();

  while (section) {
    yield section;
    section = await readStreamSection();
  }
};

const mergeArrays = (...arrays: Uint8Array[]) => {
  const out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0));
  let offset = 0;
  for (const arr of arrays) {
    out.set(arr, offset);
    offset += arr.length;
  }

  return out;
};
