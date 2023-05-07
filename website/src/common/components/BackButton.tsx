import { Button, type ButtonProps, type PrimitiveProps } from '@resolid/nxt-ui';
import { useLocation, useNavigate, type To } from 'react-router-dom';

export type BackButtonProps = ButtonProps & { backTo?: To };

export const BackButton = (props: PrimitiveProps<'button', BackButtonProps>) => {
  const { onClick, backTo = '/', ...rest } = props;

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
    />
  );
};
