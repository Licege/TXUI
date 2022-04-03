import './styles/constants.css';
import './styles/config_constants.css';
import './styles/animations.css';
import './styles/common.css';

/**
 * Wrappers
 */
export { AppRoot } from './components/AppRoot/AppRoot';
export { AdaptivityProvider } from './components/AdaptivityProvider/AdaptivityProvider';
export { AppearanceProvider } from './components/AppearanceProvider/AppearanceProvider';
export { default as ConfigProvider } from './components/ConfigProvider/ConfigProvider';
export type { ConfigProviderProps } from './components/ConfigProvider/ConfigProvider';

/**
 * Blocks
 */
export { default as Button } from './components/Button/Button';
export type { ButtonProps } from './components/Button/Button';

/**
 * Typography
 */
export { default as Title } from './components/Typography/Title/Title';
export type { TitleProps } from './components/Typography/Title/Title';
export { default as Headline } from './components/Typography/Headline/Headline';
export type { HeadlineProps } from './components/Typography/Headline/Headline';
export { default as Text } from './components/Typography/Text/Text';
export type { TextProps } from './components/Typography/Text/Text';
export { default as Caption } from './components/Typography/Caption/Caption';
export type { CaptionProps } from './components/Typography/Caption/Caption';
export { default as Subhead } from './components/Typography/Subhead/Subhead';
export type { SubheadProps } from './components/Typography/Subhead/Subhead';

/**
 * HOCs
 */
export { withPlatform } from './hoc/withPlatform';
export { withAdaptivity } from './hoc/withAdaptivity';

/**
 * Hooks
 */
export { usePlatform } from './hooks/usePlatform';
export { useAdaptivity } from './hooks/useAdaptivity';
export { useAppearance } from './hooks/useAppearance';

/**
 * Utils
 */
export {
  platform,
  ANDROID,
  IOS,
  Platform
} from './lib/platform';
export {
  ViewWidth,
  ViewHeight,
  SizeType
} from './components/AppearanceProvider/AppearanceContext';
