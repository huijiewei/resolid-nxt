import { Icon, type IconProps } from '@resolid/nxt-ui';

export const AtSymbol = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
      />
    </Icon>
  );
};