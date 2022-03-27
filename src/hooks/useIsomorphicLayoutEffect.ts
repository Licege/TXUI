import React from 'react';
import { canUseDom } from '../lib/dom';

export const useIsomorphicLayoutEffect = canUseDom
  ? React.useLayoutEffect
  : React.useEffect;
