import { canUseDom } from './dom';

export const IPHONE_SAFARI_BOTTOM_BAR = 45;
export const IPHONE_X_SAFARI_BOTTOM_BAR = 85;

export const IPHONE_KEYBOARD_REJECT_OFFSET = 180;

export const IOS_NO_KEYBOARD_ALLOWED_OFFSET = 70;

export function detectedIOS(userAgent?: string) {
  if (!userAgent) {
    userAgent = canUseDom ? navigator.userAgent.toLowerCase() : '';
  }

  const isIPadOS = checkIPadOS(userAgent);
  const isIPad = isIPadOS || userAgent.indexOf('ipad') !== -1;
  const isIPhone = !isIPad && userAgent.search(/iphone|ipod/) !== -1;
  const isIOS = isIPhone || isIPad;

  let iosVersion = isIOS && userAgent.match(/OS [\d_]+ like Mac OS X/i);
  let iosMajor = 0;
  let iosMinor = 0;

  if (isIPadOS) {
    iosMajor = 13;
    iosMinor = 0;
  } else if (iosVersion) {
    iosVersion = iosVersion[1].split('_');
    iosMajor = +iosVersion[0];
    iosMinor = +iosVersion[1];
  }

  iosVersion = null;

  const isScrollBasedViewport = iosMajor < 13 && !(iosMajor === 11 && iosMinor < 3);
  const isWKWebView = isIOS && checkWKWebView(userAgent);

  let isIPhoneX = false;

  if (canUseDom) {
    isIPhoneX =
      isIOS &&
      screen.width === 375 &&
      screen.height === 812 &&
      window.devicePixelRatio === 3;
  }

  const isIOSChrome = userAgent.search(/crios/i) !== -1;

  return {
    isIPad,
    isIPhone,
    isIOS,
    isIPadOS,
    iosMajor,
    iosMinor,
    isWKWebView,
    isScrollBasedViewport,
    isIPhoneX,
    isIOSChrome
  }
}

const {
  isIPad,
  isIPhone,
  isIOS,
  isIPadOS,
  iosMajor,
  iosMinor,
  isWKWebView,
  isScrollBasedViewport,
  isIPhoneX,
  isIOSChrome
} = detectedIOS();

export {
  isIPad,
  isIPhone,
  isIOS,
  isIPadOS,
  iosMajor,
  iosMinor,
  isWKWebView,
  isScrollBasedViewport,
  isIPhoneX,
  isIOSChrome
}

export function isLandscapePhone() {
  return Math.abs(window.orientation as number) === 90 && !isIPad;
}

// Reference:
// https://stackoverflow.com/questions/28795476/detect-if-page-is-loaded-inside-wkwebview-in-javascript/30495399#30495399
function checkWKWebView(userAgent: string) {
  if (!canUseDom) {
    return false;
  }

  const webkit = (window as any).webkit;

  if (webkit && webkit.messageHandlers) {
    return true;
  }

  const lte9 = /constructor/i.test(String(window.HTMLElement));
  const idb = Boolean(window.indexedDB);

  if (
    userAgent.indexOf('safari') !== -1 &&
    userAgent.indexOf('version') !== -1 &&
    !(navigator as any).standalone
  ) {
    // Safari (WKWebView/Nitro since 6+)
  } else if ((!idb && lte9) || !(window.statusbar?.visible)) {
    // UIWebView
  } else if (!lte9 || idb) {
    return true;
  }

  return false;
}

export function checkIPadOS(userAgent: string) {
  if (!canUseDom) {
    return false;
  }

  const notIOS = !/ipad|iphone|ipod/.test(userAgent);
  const macOS = /mac os/.test(userAgent);

  return macOS && notIOS && typeof (navigator as any).standalone === 'boolean';
}
