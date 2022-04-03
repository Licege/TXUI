import React from 'react';
import { setRef } from '../lib/util';

export function useExternRef<T>(
  ...externRefs: Array<React.Ref<T> | undefined | false>
): React.MutableRefObject<T | null> {
  const stableRef = React.useRef<T | null>(null);

  return React.useMemo(() => ({
    get current() {
      return stableRef.current;
    },
    set current(el) {
      stableRef.current = el;
      externRefs.forEach(ref => {
        if (ref) {
          setRef(el, ref);
        }
      })
    }
  }), externRefs)
}
