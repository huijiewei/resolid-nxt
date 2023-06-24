import { Button, type ButtonProps, type PrimitiveProps } from '@resolid/nxt-ui';
import { useTranslation } from 'react-i18next';
import { useLocation, type To } from 'react-router-dom';
import { useLocalizedNavigate } from '~/common/components/LocalizedLink';

export type BackButtonProps = ButtonProps & { backTo?: To };

export const BackButton = (props: PrimitiveProps<'button', BackButtonProps, 'children'>) => {
  const { onClick, backTo = '/', ...rest } = props;

  const { t } = useTranslation('common');
  const navigate = useLocalizedNavigate();
  const { state } = useLocation();

  const historyBack = () => {
    if (state && state.previous) {
      navigate(-1);
    } else {
      navigate(backTo);
    }
  };

  return (
    <Button
      onClick={(e) => {
        onClick && onClick(e);
        historyBack();
      }}
      {...rest}
    >
      {t('button.back')}
    </Button>
  );
};
