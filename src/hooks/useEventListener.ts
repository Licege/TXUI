import React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { noop } from '../lib/util';
import { canUseDom } from '../lib/dom';

interface EventListenerHandle {
  add: (el: HTMLElement | Document | Window) => void;
  remove: () => void;
}

export function useEventListener<K extends keyof GlobalEventHandlersEventMap>(
  event: K,
  _cb:
    | false
    | null
    | undefined
    | ((ev: GlobalEventHandlersEventMap[K]) => void),
  _options?: AddEventListenerOptions
): EventListenerHandle;

export function useEventListener<E extends Event>(
  event: string,
  _cb: false | null | undefined | ((ev: E) => void),
  _options?: AddEventListenerOptions,
): EventListenerHandle;

export function useEventListener<
  E extends Event,
  K extends keyof GlobalEventHandlersEventMap
>(
  event: string | K,
  _cb: false | null | undefined | ((ev: E) => void),
  _options?: AddEventListenerOptions
): EventListenerHandle {
  const cbRef = React.useRef(_cb);

  useIsomorphicLayoutEffect(() => {
    cbRef.current = _cb;
  }, [_cb]);

  const cb = React.useCallback((e) => cbRef.current && cbRef.current(e), []);

  const detach = React.useRef(noop);

  const remove = React.useCallback(() => {
    detach.current();
    detach.current = noop;
  }, []);

  const add = React.useCallback(
    (el: HTMLElement | Document | Window) => {
      if (!canUseDom) {
        return;
      }

      remove();

      if (!el) {
        return;
      }

      const options = { ..._options };
      el.addEventListener(event, cb, options);
      detach.current = () => el.removeEventListener(event, cb, options);
    },
    [_options, cb, event, remove]
  );

  React.useEffect(() => remove, [remove]);

  return { add, remove };
}
