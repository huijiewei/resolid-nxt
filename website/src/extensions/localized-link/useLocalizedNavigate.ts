import { isNumber } from '@resolid/nxt-utils';
import { useNavigate, useSearchParams, type NavigateFunction, type NavigateOptions, type To } from 'react-router-dom';
import { localizedTo } from '~/extensions/localized-link/localizedLinkUtils';
import { LOCALE_PARAMS } from '~/i18n';

export const useLocalizedNavigate = (): NavigateFunction => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (to, options: NavigateOptions = {}) => {
    if (isNumber(to)) {
      navigate(to);
    }

    navigate(localizedTo(to as To, searchParams.get(LOCALE_PARAMS)), options);
  };
};
