import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'select-none appearance-none outline-none',
    'whitespace-nowrap border transition-colors',
    'rounded',
    'disabled:(cursor-not-allowed opacity-50)',
  ],
  {
    variants: {
      size: { xs: 'h-6 px-2 text-sm', sm: 'h-7 px-3', md: 'h-8 px-4', lg: 'h-9 px-5', xl: 'h-10 px-6 text-lg' },
      variant: {
        solid: 'text-fg-emphasized border-transparent',
        outline: 'bg-bg-default border-current',
        light: 'border-transparent',
        subtle: 'border-transparent bg-bg-default',
        link: 'border-transparent underline underline-offset-2',
      },
      color: {
        primary: '',
        neutral: '',
        success: '',
        warning: '',
        danger: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'primary',
        class: 'bg-bg-primary-emphasis hover:bg-bg-primary-emphasis-hovered active:bg-bg-primary-emphasis-pressed',
      },
      {
        variant: 'solid',
        color: 'neutral',
        class: 'bg-bg-neutral-emphasis hover:bg-bg-neutral-emphasis-hovered active:bg-bg-neutral-emphasis-pressed',
      },
      {
        variant: 'solid',
        color: 'success',
        class: 'bg-bg-success-emphasis hover:bg-bg-success-emphasis-hovered active:bg-bg-success-emphasis-pressed',
      },
      {
        variant: 'solid',
        color: 'warning',
        class: 'bg-bg-warning-emphasis hover:bg-bg-warning-emphasis-hovered active:bg-bg-warning-emphasis-pressed',
      },
      {
        variant: 'solid',
        color: 'danger',
        class: 'bg-bg-danger-emphasis hover:bg-bg-danger-emphasis-hovered active:bg-bg-danger-emphasis-pressed',
      },
      {
        variant: 'outline',
        color: 'primary',
        class: 'text-fg-primary hover:bg-bg-primary active:bg-bg-primary-hovered',
      },
      {
        variant: 'outline',
        color: 'success',
        class: 'text-fg-success hover:bg-bg-success active:bg-bg-success-hovered',
      },
      {
        variant: 'outline',
        color: 'warning',
        class: 'text-fg-warning hover:bg-bg-warning active:bg-bg-warning-hovered',
      },
      {
        variant: 'outline',
        color: 'danger',
        class: 'text-fg-danger hover:bg-bg-danger active:bg-bg-danger-hovered',
      },
      {
        variant: 'outline',
        color: 'neutral',
        class: 'text-fg-neutral hover:bg-bg-neutral active:bg-bg-neutral-hovered',
      },
      {
        variant: 'light',
        color: 'primary',
        class: 'text-fg-primary bg-bg-primary hover:bg-bg-primary-hovered active:bg-bg-primary-pressed',
      },
      {
        variant: 'light',
        color: 'success',
        class: 'text-fg-success bg-bg-success hover:bg-bg-success-hovered active:bg-bg-success-pressed',
      },
      {
        variant: 'light',
        color: 'warning',
        class: 'text-fg-warning bg-bg-warning hover:bg-bg-warning-hovered active:bg-bg-warning-pressed',
      },
      {
        variant: 'light',
        color: 'danger',
        class: 'text-fg-danger bg-bg-danger hover:bg-bg-danger-hovered active:bg-bg-danger-pressed',
      },
      {
        variant: 'light',
        color: 'neutral',
        class: 'text-fg-neutral bg-bg-neutral hover:bg-bg-neutral-hovered active:bg-bg-neutral-pressed',
      },
      {
        variant: 'subtle',
        color: 'primary',
        class: 'text-fg-primary hover:bg-bg-primary active:bg-bg-primary-hovered',
      },
      {
        variant: 'subtle',
        color: 'success',
        class: 'text-fg-success hover:bg-bg-success active:bg-bg-success-hovered',
      },
      {
        variant: 'subtle',
        color: 'warning',
        class: 'text-fg-warning hover:bg-bg-warning active:bg-bg-warning-hovered',
      },
      {
        variant: 'subtle',
        color: 'danger',
        class: 'text-fg-danger hover:bg-bg-danger active:bg-bg-danger-hovered',
      },
      {
        variant: 'subtle',
        color: 'neutral',
        class: 'text-fg-neutral hover:bg-bg-neutral active:bg-bg-neutral-hovered',
      },
      {
        variant: 'link',
        color: 'primary',
        class: 'text-fg-primary hover:text-fg-primary-hovered active:text-fg-primary-pressed',
      },
      {
        variant: 'link',
        color: 'success',
        class: 'text-fg-success hover:text-fg-success-hovered active:text-fg-success-pressed',
      },
      {
        variant: 'link',
        color: 'warning',
        class: 'text-fg-warning hover:text-fg-warning-hovered active:text-fg-warning-pressed',
      },
      {
        variant: 'link',
        color: 'danger',
        class: 'text-fg-danger hover:text-fg-danger-hovered active:text-fg-danger-pressed',
      },
      {
        variant: 'link',
        color: 'neutral',
        class: 'text-fg-neutral hover:text-fg-neutral-hovered active:text-fg-neutral-pressed',
      },
    ],
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
