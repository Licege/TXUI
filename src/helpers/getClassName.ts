import { platform, PlatformType } from '../lib/platform';

export function getClassName(
  base: string,
  osname: PlatformType = platform()
): string {
  return `${base} ${base}--${osname}`;
}
