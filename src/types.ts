import React from 'react';
import { PlatformType } from './lib/platform';

export type AlignType = "left" | "center" | "right";

export interface HasRootRef<T> {
  getRootRef?: React.Ref<T>;
}

export interface HasAlign {
  align?: AlignType
}

export interface HasComponent {
  Component?: React.ElementType
}

export interface HasPlatform {
  platform?: PlatformType
}

export interface Version {
  major: number,
  minor?: number,
  patch?: number
}
