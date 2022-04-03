import React from 'react';
import { HasPlatform } from '../types';
import { usePlatform } from '../hooks/usePlatform';

export function withPlatform<T extends HasPlatform>(
  Component: React.ComponentType<T>
): React.FC<Omit<T, keyof HasPlatform>> {
  function WithPlatform(props: Omit<T, keyof HasPlatform>) {
    const platform = usePlatform();

    return (
      <Component {...(props as T)} platform={platform} />
    )
  }

  return WithPlatform;
}
