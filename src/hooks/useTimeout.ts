import React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { canUseDom } from '../lib/dom';
import { isFunction } from '../lib/util';

export function useTimeout(cb: () => any, duration: number) {
  const options = React.useRef({ cb, duration });

  useIsomorphicLayoutEffect(() => {
    options.current.cb = cb;
    options.current.duration = duration;
  }, [cb, duration]);

  const timeout = React.useRef<ReturnType<typeof setTimeout>>();

  const clear = React.useCallback(() => {
    if (canUseDom && timeout?.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  const set = React.useCallback(
    (duration = options.current.duration) => {
      clear();

      if (canUseDom) {
        timeout.current = setTimeout(() => {
          const { cb } = options.current;
          isFunction(cb) && cb();
        }, duration);
      }
    },
    [clear]
  );

  useIsomorphicLayoutEffect(() => clear, []);

  return { set, clear };
}
