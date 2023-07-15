export const FormError = ({ message }: { message: string | undefined }) => {
  return <>{message && <p className={'absolute left-0 top-full text-sm text-fg-danger'}>{message}</p>}</>;
};
