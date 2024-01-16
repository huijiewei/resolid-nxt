import { cx } from '@resolid/nxt-ui';
import { useNProgress } from '@tanem/react-nprogress';
import type { CSSProperties } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';

const ANIMATION_DURATION = 200;

const RouteNProgressBar = ({ isLoading }: { isLoading: boolean }) => {
  const { isFinished, progress } = useNProgress({
    animationDuration: ANIMATION_DURATION,
    isAnimating: isLoading,
  });

  return (
    <div
      className={cx(
        isFinished ? 'opacity-0' : 'opacity-100',
        'transition-opacity ease-linear',
        `duration-[var(--animation-duration)]`,
        'pointer-events-none',
      )}
      style={{ ['--animation-duration']: `${ANIMATION_DURATION}ms` } as CSSProperties}
    >
      <div
        className={cx(
          'fixed left-0 top-0 z-[5000] h-[3px] w-full bg-blue-300',
          'transition-[margin-left] ease-linear',
          `duration-[var(--animation-duration)]`,
          `ml-[var(--progress)]`,
        )}
        style={
          {
            ['--progress']: `${(-1 + progress) * 100}%`,
          } as CSSProperties
        }
      ></div>
    </div>
  );
};

export const RouteProgressBar = () => {
  const navigation = useNavigation();
  const { key: locationKey } = useLocation();

  const navigating = navigation.location && !navigation.formData;
  const resetKey = navigation.location?.key || locationKey;

  return <RouteNProgressBar key={resetKey} isLoading={navigating ?? false} />;
};
