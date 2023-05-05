import { createContext } from '../../primitives';
import { type AlertStyles } from './Alert.styles';

export type AlertContext = {
  /**
   * Variant
   * @default 'light'
   */
  variant?: NonNullable<AlertStyles['variant']>;
};

const [AlertProvider, useAlert] = createContext<AlertContext>({
  strict: true,
  name: 'AlertContext',
});

export { AlertProvider, useAlert };
