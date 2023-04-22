import type { PrimitiveProps } from '@resolid/nxt-ui';
import { decodeBlurHash } from 'fast-blurhash';
import { useEffect, useRef } from 'react';

export type BlurhashCanvasProps = {
  hash: string;
  width: number;
  height: number;
  punch?: number;
};

export const BlurhashCanvas = (props: PrimitiveProps<'canvas', BlurhashCanvasProps>) => {
  const { hash, width, height, punch, ...rest } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const pixels = decodeBlurHash(hash, width, height, punch);

      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [hash, height, punch, width]);

  return <canvas {...rest} height={height} width={width} ref={canvasRef} />;
};
