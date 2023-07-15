import { __DEV__, cx } from '@resolid/nxt-utils';
import { polymorphicComponent } from '../../primitives';
import { inputSizeStyles } from './Input.style';
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
        'flex items-center rounded border !border-border-default bg-bg-subtlest first:rounded-br-none first:rounded-tr-none last:rounded-bl-none last:rounded-tl-none [&:not(:first-child)]:-ml-px [&:not(:first-child,:last-child)]:rounded-none',
        inputSizeStyles(false, false)[group.size],
        className,
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
