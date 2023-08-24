import { __DEV__ } from '@resolid/nxt-utils';
import { cloneElement, type ReactElement } from 'react';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { Overlay, type OverlayProps } from '../overlay/Overlay';
import { Spinner } from '../spinner/Spinner';

export type SpinnerOverlayProps = OverlayProps & {
  /**
   * Visible
   */
  visible: boolean;
};

export const SpinnerOverlay = primitiveComponent<'div', SpinnerOverlayProps>((props, ref) => {
  const { visible, className, radius, opacity, color, blur, children, ...rest } = props;

  const spinner = (children as ReactElement) || <Spinner size={'xl'} color={'primary'} />;

  return (
    <>
      {visible && (
        <div
          ref={ref}
          className={cx('absolute inset-0 z-10 flex items-center justify-center overflow-hidden', className)}
          {...rest}
        >
          {cloneElement(spinner, { className: 'z-20' })}
          <Overlay radius={radius} opacity={opacity} color={color} blur={blur} />
        </div>
      )}
    </>
  );
});

if (__DEV__) {
  SpinnerOverlay.displayName = 'SpinnerOverlay';
}
