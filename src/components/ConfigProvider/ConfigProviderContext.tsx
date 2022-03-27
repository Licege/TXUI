import React from 'react';
import { platform, PlatformType } from '../../lib/platform';

export interface ConfigProviderContextInterface {
  platform: PlatformType;
  hasNewTokens: boolean;
}

export const ConfigProviderContext =
  React.createContext<ConfigProviderContextInterface>({
    platform: platform(),
    hasNewTokens: false
  })
