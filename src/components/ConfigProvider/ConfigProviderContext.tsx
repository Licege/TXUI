import React from 'react';
import { platform, PlatformType } from '../../lib/platform';
import { AppearanceType } from '../AppearanceProvider/AppearanceContext';

export interface ConfigProviderContextInterface {
  platform: PlatformType;
  hasNewTokens: boolean;
  appearance?: AppearanceType
}

export const ConfigProviderContext =
  React.createContext<ConfigProviderContextInterface>({
    platform: platform(),
    hasNewTokens: false
  })
