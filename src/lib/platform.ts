import { BrowserInfo, computeBrowserInfo } from './browser';

export enum Platform {
  ANDROID = 'android',
  IOS = 'ios'
}

export const ANDROID = Platform.ANDROID;
export const IOS = Platform.IOS;

export type PlatformType =
  | Platform.ANDROID
  | Platform.IOS
  | string;

export function platform(browserInfo?: BrowserInfo): PlatformType {
  if (!browserInfo) {
    browserInfo = computeBrowserInfo();
  }

  return browserInfo.system === 'ios' ? IOS : ANDROID;
}
