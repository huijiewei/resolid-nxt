import { Button, type ButtonProps, type PrimitiveProps } from '@resolid/nxt-ui';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, type To } from 'react-router-dom';

export type BackButtonProps = ButtonProps & { backTo?: To };

export const BackButton = (props: PrimitiveProps<'button', BackButtonProps, 'children'>) => {
  const { onClick, backTo = '/', ...rest } = props;

  const { t } = useTranslation('common');
  const navigate = useNavigate();
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
