import React from 'react';
import {
  AdaptivityContext,
  AdaptivityContextInterface,
  AdaptivityProps
} from '../components/AdaptivityProvider/AdaptivityContext';

export type { AdaptivityProps };

export const useAdaptivity = (): AdaptivityContextInterface => {
  return React.useContext(AdaptivityContext);
};
