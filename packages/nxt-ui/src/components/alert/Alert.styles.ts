import { cva, type VariantProps } from 'class-variance-authority';

export const alertStyles = cva(['relative flex items-center gap-2 overflow-hidden rounded border p-3'], {
  variants: {
    color: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      danger: '',
    },
    variant: {
      solid: 'text-fg-emphasized border-transparent',
      outline: 'bg-bg-default border-current',
      light: 'border-transparent',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'primary',
      class: 'bg-bg-primary-emphasis',
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: 'bg-bg-neutral-emphasis',
    },
    {
      variant: 'solid',
      color: 'success',
      class: 'bg-bg-success-emphasis',
    },
    {
      variant: 'solid',
      color: 'warning',
      class: 'bg-bg-warning-emphasis',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-bg-danger-emphasis',
    },
    {
      variant: 'outline',
      color: 'primary',
      class: 'text-fg-primary',
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: 'text-fg-neutral',
    },
    {
      variant: 'outline',
      color: 'success',
      class: 'text-fg-success',
    },
    {
      variant: 'outline',
      color: 'warning',
      class: 'text-fg-warning',
    },
    {
      variant: 'outline',
      color: 'danger',
      class: 'text-fg-danger',
    },
    {
      variant: 'light',
      color: 'primary',
      class: 'bg-bg-primary text-fg-primary',
    },
    {
      variant: 'light',
      color: 'neutral',
      class: 'bg-bg-neutral text-fg-neutral',
    },
    {
      variant: 'light',
      color: 'success',
      class: 'bg-bg-success text-fg-success',
    },
    {
      variant: 'light',
      color: 'warning',
      class: 'bg-bg-warning text-fg-warning',
    },
    {
      variant: 'light',
      color: 'danger',
      class: 'bg-bg-danger text-fg-danger',
    },
  ],
});

export type AlertStyles = VariantProps<typeof alertStyles>;
