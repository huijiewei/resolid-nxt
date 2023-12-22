// noinspection JSUnresolvedReference

import { type UNSAFE_DeferredData as DeferredData, type TrackedPromise } from '@remix-run/router';

const DEFERRED_VALUE_PLACEHOLDER_PREFIX = '__deferred_promise:';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDeferredReadableStream = (deferredData: DeferredData, signal: AbortSignal): any => {
  const encoder = new TextEncoder();

  return new ReadableStream({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async start(controller: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const criticalData: any = {};

      const preResolvedKeys: string[] = [];
      for (const [key, value] of Object.entries(deferredData.data)) {
        if (isTrackedPromise(value)) {
          criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`;
          if (typeof value._data !== 'undefined' || typeof value._error !== 'undefined') {
            preResolvedKeys.push(key);
          }
        } else {
          criticalData[key] = value;
        }
      }

      controller.enqueue(encoder.encode(JSON.stringify(criticalData) + '\n\n'));

      for (const preResolvedKey of preResolvedKeys) {
        enqueueTrackedPromise(controller, encoder, preResolvedKey, deferredData.data[preResolvedKey] as TrackedPromise);
      }

      const unsubscribe = deferredData.subscribe((_aborted, settledKey) => {
        if (settledKey) {
          enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey] as TrackedPromise);
        }
      });

      await deferredData.resolveData(signal);
      unsubscribe();
      controller.close();
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTrackedPromise = (value: any): value is TrackedPromise =>
  value != null && typeof value.then === 'function' && value._tracked === true;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enqueueTrackedPromise = (controller: any, encoder: TextEncoder, settledKey: string, promise: TrackedPromise) => {
  if ('_error' in promise) {
    controller.enqueue(
      encoder.encode(
        'error:' +
          JSON.stringify({
            [settledKey]: promise._error,
          }) +
          '\n\n',
      ),
    );
  } else {
    controller.enqueue(encoder.encode('data:' + JSON.stringify({ [settledKey]: promise._data ?? null }) + '\n\n'));
  }
};
