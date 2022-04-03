import React from 'react';
import { ConfigProviderContext, ConfigProviderContextInterface } from './ConfigProviderContext';
import { useDOM } from '../../lib/dom';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { LocaleProviderContext } from '../LocaleProviderContext/LocaleProviderContext';
import { AppearanceProvider } from '../AppearanceProvider/AppearanceProvider';
import { getScheme } from '../../helpers/getScheme';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { platform as resolvePlatform } from '../../lib/platform';

export interface ConfigProviderProps
  extends Partial<ConfigProviderContextInterface> {
  locale?: string
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  platform = resolvePlatform(),
  hasNewTokens = false,
  appearance,
  locale = 'ru'
}) => {
  const normalizedScheme = getScheme({ platform, appearance });
  const { document } = useDOM();
  const target = document?.body;

  useIsomorphicLayoutEffect(() => {
    target?.setAttribute('scheme', normalizedScheme);

    return () => target?.removeAttribute('scheme');
  }, [normalizedScheme]);

  const configContext = useObjectMemo({
    hasNewTokens,
    platform,
    appearance
  })

  return (
    <ConfigProviderContext.Provider value={configContext}>
      <LocaleProviderContext.Provider value={locale}>
        <AppearanceProvider appearance={appearance}>
          {children}
        </AppearanceProvider>
      </LocaleProviderContext.Provider>
    </ConfigProviderContext.Provider>
  );
};

export default ConfigProvider;
