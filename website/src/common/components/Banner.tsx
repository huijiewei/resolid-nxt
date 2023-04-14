import { useColorModeState } from '@resolid/nxt-ui';
import ResolidBannerDark from '~/assets/images/resolid-banner-dark.svg';
import ResolidBanner from '~/assets/images/resolid-banner.svg';

export const Banner = () => {
  const { darkMode } = useColorModeState();

  return <img height={32} width={129} alt={'Resolid Nxt'} src={darkMode ? ResolidBannerDark : ResolidBanner} />;
};
