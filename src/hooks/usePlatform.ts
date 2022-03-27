import React from 'react';
import { PlatformType } from '../lib/platform';
import { ConfigProviderContext } from '../components/ConfigProvider/ConfigProviderContext';

export function usePlatform(): PlatformType {
  const { platform } = React.useContext(ConfigProviderContext);

  return platform;
}
