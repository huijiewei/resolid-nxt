import { createContext } from '../../primitives';
import { type AlertStyles } from './Alert.style';

export type AlertContext = {
  /**
   * Variant
   * @default 'light'
   */
  variant?: AlertStyles['variant'];
};

const [AlertProvider, useAlert] = createContext<AlertContext>({
  strict: true,
  name: 'AlertContext',
});

export { AlertProvider, useAlert };
