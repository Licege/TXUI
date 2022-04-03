import React from 'react';
import { Appearance } from '../../helpers/scheme';

export type AppearanceType = 'light' | 'dark';

export enum SizeType {
  COMPACT = "compact",
  REGULAR = "regular",
}

export enum ViewWidth {
  SMALL_MOBILE = 1,
  MOBILE,
  SMALL_TABLET,
  TABLET,
  DESKTOP,
}

export enum ViewHeight {
  EXTRA_SMALL = 1,
  SMALL,
  MEDIUM,
}

export const AppearanceContext = React.createContext<AppearanceType>(
  Appearance.LIGHT
);
