export const FormError = ({ message }: { message: string | undefined }) => {
  return <>{message && <p className={'text-fg-danger text-sm absolute top-full left-0'}>{message}</p>}</>;
};
