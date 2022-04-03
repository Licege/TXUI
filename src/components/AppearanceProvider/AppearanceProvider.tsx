import React from 'react';
import { AppearanceContext, AppearanceType } from './AppearanceContext';
import { usePlatform } from '../../hooks/usePlatform';
import { getScheme } from '../../helpers/getScheme';
import classNames from 'classnames';

export interface AppearanceProviderProps {
  appearance?: AppearanceType;
}

export const AppearanceProvider: React.FC<AppearanceProviderProps> = ({
  children,
  appearance = 'light'
}) => {
  const platform = usePlatform();
  const scheme = getScheme({ platform, appearance });

  return (
    <AppearanceContext.Provider value={appearance}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className: classNames(
              child.props.className,
              `txui${scheme}`
            )
          })
        }
        return child;
      })}
    </AppearanceContext.Provider>
  )
}
