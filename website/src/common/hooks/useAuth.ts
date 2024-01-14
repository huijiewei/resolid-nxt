import { useEffect } from 'react';
import { resolvePath, useSearchParams } from 'react-router-dom';
import { useAuthModalDispatch } from '~/common/components/AuthModal';
import { useAuthDispatch } from '~/common/components/AuthProvider';
import { useAuthUserDispatch } from '~/common/components/AuthUserProvider';
import { useLocalizedNavigate } from '~/common/components/LocalizedLink';
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
