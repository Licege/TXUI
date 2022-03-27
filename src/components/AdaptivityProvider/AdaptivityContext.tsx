import React from 'react';
import { hasMouse, hasHover } from '../../lib/inputUtils';

export enum SizeType {
  COMPACT = 'compact',
  REGULAR = 'regular'
}

export enum ViewWidth {
  SMALL_MOBILE = 1,
  MOBILE,
  SMALL_TABLET,
  TABLET,
  DESKTOP
}

export enum ViewHeight {
  EXTRA_SMALL = 1,
  SMALL,
  MEDIUM
}

export interface SizeProps {
  sizeX?: SizeType,
  sizeY?: SizeType
}

export interface AdaptivityProps extends SizeProps {
  viewWidth?: ViewWidth,
  viewHeight?: ViewHeight,
  hasMouse?: boolean,
  deviceHasHover?: boolean
}

export interface AdaptivityContextInterface extends SizeProps {
  viewWidth: ViewWidth,
  viewHeight: ViewHeight,
  hasMouse: boolean,
  deviceHasHover: boolean
}

export const AdaptivityContext =
  React.createContext<AdaptivityContextInterface>({
    sizeX: SizeType.COMPACT,
    sizeY: SizeType.REGULAR,
    hasMouse,
    deviceHasHover: hasHover,
    viewWidth: 0,
    viewHeight: 0
  })
