import { cx } from '@resolid/nxt-ui';
import { useNProgress } from '@tanem/react-nprogress';
import { useLocation, useNavigation } from 'react-router-dom';

const LOADING_STATE = 'loading';
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
        'transition-opacity',
        `duration-[${ANIMATION_DURATION}ms]`,
        'pointer-events-none',
      )}
    >
      <div
        className={cx(
          'fixed left-0 top-0 z-[5000] h-[3px] w-full bg-blue-300',
          'transition-[margin-left]',
          `ml-[${(-1 + progress) * 100}%]`,
        )}
      ></div>
    </div>
  );
};

export const RouteProgressBar = () => {
  const navigation = useNavigation();
  const { key: locationKey } = useLocation();

  const isLoading = navigation.state === LOADING_STATE;
  const resetKey = navigation.location?.key || locationKey;

  return <RouteNProgressBar key={resetKey} isLoading={isLoading} />;
};
