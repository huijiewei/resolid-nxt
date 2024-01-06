import { codeFrameColumns } from '@babel/code-frame';

const parsePositionInformationFromErrorMessage = (
  message: string,
): { start: { line: number; column: number } } | undefined => {
  const positionInfoPattern = /\d+:\d+(-\d+:\d+)/g;

  const match = message.match(positionInfoPattern);

  if (match) {
    const lastMatch = match.slice(-1)[0];

    const [line, column] = lastMatch.split('-')[0].split(':');

    return {
      start: {
        line: Number.parseInt(line, 10),
        column: Number.parseInt(column, 10),
      },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFormattedMDXError = (error: any, source: string) => {
  const position = error?.position ?? parsePositionInformationFromErrorMessage(error?.message);

  const codeFrames = position
    ? codeFrameColumns(
        source,
        {
          start: {
            line: position.start.line,
            column: position.start.column ?? 0,
          },
        },
        { linesAbove: 2, linesBelow: 2 },
      )
    : '';

  const formattedError = new Error(`[nxt-mdx-remote] error compiling MDX:
${error?.message}
${codeFrames ? '\n' + codeFrames + '\n' : ''}
More information: https://mdxjs.com/docs/troubleshooting-mdx`);

  formattedError.stack = '';

  return formattedError;
};
