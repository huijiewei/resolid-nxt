import { __DEV__, cx } from '@resolid/nxt-utils';
import { polymorphicComponent } from '../../primitives';
import { inputSizeStyles } from './Input.styles';
import { useInputGroup } from './InputGroupContext';

export const InputAddon = polymorphicComponent<'div'>((props, ref) => {
  const { as: Component = 'div', className, children, ...rest } = props;

  const group = useInputGroup();

  if (group == undefined) {
    throw new Error(`useInputGroup returned \`undefined\`. Seems you forgot to wrap component within InputGroup`);
  }

  return (
    <Component
      ref={ref}
      className={cx(
        'flex items-center rounded border bg-bg-subtlest !border-border-default last:rounded-tl-none last:rounded-bl-none first:rounded-tr-none first:rounded-br-none [&:not(:first-child,:last-child)]:rounded-none [&:not(:first-child)]:-ml-px',
        inputSizeStyles(false, false)[group.size],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

if (__DEV__) {
  InputAddon.displayName = 'InputAddon';
}
