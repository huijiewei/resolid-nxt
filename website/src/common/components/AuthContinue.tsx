import { Button, Divider } from '@resolid/nxt-ui';
import { useTranslation } from 'react-i18next';
import { Apple } from '~/common/icons/Apple';
import { Facebook } from '~/common/icons/Facebook';
import { Github } from '~/common/icons/Github';
import { Google } from '~/common/icons/Google';
import { Microsoft } from '~/common/icons/Microsoft';
import { Twitter } from '~/common/icons/Twitter';

export const AuthContinue = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Divider className={'my-3'}>{t('orContinue')}</Divider>
      <div className={'grid grid-cols-3 gap-3 justify-center'}>
        <Button variant={'outline'} color={'neutral'}>
          <Github className={'me-2'} /> Github
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Apple className={'me-2'} /> Apple
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Google className={'me-2'} /> Google
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Twitter className={'me-2'} /> Twitter
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Facebook className={'me-2'} /> Facebook
        </Button>
        <Button variant={'outline'} color={'neutral'}>
          <Microsoft className={'me-2'} /> Microsoft
        </Button>
      </div>
    </>
  );
};
