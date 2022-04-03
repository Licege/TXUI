import { useEventListener } from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useGlobalEventListener<
  K extends keyof GlobalEventHandlersEventMap
>(
  element: Document | HTMLElement | Window | null | undefined,
  event: K,
  cb: ((event: GlobalEventHandlersEventMap[K]) => void) | null | false | undefined,
  options?: AddEventListenerOptions
): void;

export function useGlobalEventListener<E extends Event>(
  element: Document | HTMLElement | Window | null | undefined,
  event: string,
  cb: ((event: E) => void) | null | false | undefined,
  options?: AddEventListenerOptions
): void;

export function useGlobalEventListener<
  K extends keyof GlobalEventHandlersEventMap,
  E extends Event
>(
  element: Document | HTMLElement | Window | null | undefined,
  event: K | string,
  cb: ((event: E) => void) | null | false | undefined,
  options?: AddEventListenerOptions
) {
  const listener = useEventListener(event, cb, options);

  useIsomorphicLayoutEffect(() => {
    if (cb && element) {
      listener.add(element);
    } else {
      listener.remove();
    }
  }, [Boolean(cb), Boolean(element)]);
}
