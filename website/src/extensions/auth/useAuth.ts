import { useEffect } from 'react';
import { resolvePath, useSearchParams } from 'react-router-dom';
import { useAuthDispatch } from '~/extensions/auth/AuthContext';
import { useAuthModalDispatch } from '~/extensions/auth/AuthModalContext';
import { useAuthUserDispatch } from '~/extensions/auth/AuthUserContext';
import { useLocalizedNavigate } from '~/extensions/localized-link/useLocalizedNavigate';
import type { SessionUser } from '~/foundation/session';

type authData = {
  success: boolean;
  data?: SessionUser;
};

export const useAuth = (data: authData) => {
  const setAuthModalAction = useAuthModalDispatch();
  const { resetAction } = useAuthDispatch();
  const { setUser } = useAuthUserDispatch();
  const navigate = useLocalizedNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    if (data && data.success && data.data) {
      setUser(data.data);

      if (setAuthModalAction) {
        resetAction();
      } else {
        navigate(params.get('redirect') ? resolvePath(params.get('redirect') as string) : '', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
};
