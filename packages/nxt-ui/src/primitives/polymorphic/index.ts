import type { Assign, Merge } from '@resolid/nxt-utils';
import type {
  ComponentProps,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ForwardRefRenderFunction,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
} from 'react';
import { forwardRef } from 'react';

type PropsOf<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: ElementType;
};

export type PrimitiveProps<
  Type extends ElementType = ElementType,
  Props extends Record<string, unknown> = Record<never, never>,
  Omits extends string | number | symbol = never
> = Merge<Omit<ComponentPropsWithoutRef<Type>, Omits>, Props>;

export const primitiveComponent = <
  C extends ElementType = ElementType,
  Props extends Record<string, unknown> = Record<never, never>,
  Omits extends string | number | symbol = never
>(
  render: (
    props: Merge<Omit<ComponentPropsWithoutRef<C>, Omits>, Props>,
    ref?: ComponentPropsWithRef<C>['ref']
  ) => ReactElement | null
) => {
  return forwardRef(render);
};

export type PolymorphicProps<
  Default extends ElementType,
  Component extends ElementType,
  PermanentProps extends Record<never, never>,
  DefaultProps extends Record<never, never>,
  ComponentProps extends Record<never, never>
> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any extends Component
    ?
        | Assign<DefaultProps, PermanentProps & { as?: Default | ElementType }>
        | Assign<ComponentProps, PermanentProps & { as?: Component }>
    : never;

export type PolymorphicComponent<
  Component extends ElementType,
  Props extends Record<never, never> = Record<never, never>
> = {
  <AsComponent extends ElementType = Component>(
    props: PolymorphicProps<Component, AsComponent, Props, ComponentProps<Component>, ComponentProps<AsComponent>>
  ): JSX.Element;

  displayName?: string;
  propTypes?: WeakValidationMap<unknown>;
  contextTypes?: ValidationMap<unknown>;
  id?: string;
};

export const polymorphicComponent = <
  Component extends ElementType,
  Props extends Record<never, never> = Record<never, never>
>(
  component: ForwardRefRenderFunction<never, Assign<PropsOf<Component>, Props> & { as?: ElementType }>
) => forwardRef(component) as unknown as PolymorphicComponent<Component, Props>;
