import { PlatformType } from '../lib/platform';
import { AppearanceType } from '../components/AppearanceProvider/AppearanceContext';
import { Scheme } from './scheme';

export interface GetSchemeProps {
  platform?: PlatformType;
  appearance?: AppearanceType
}

export function getScheme({ platform, appearance }: GetSchemeProps): Scheme {
  return Scheme.TRIXOLMA;
}
