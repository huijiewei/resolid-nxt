export const FormError = ({ message }: { message: string | undefined }) => {
  return <p className={'text-fg-danger'}>{message ?? <span>&nbsp;</span>}</p>;
};
