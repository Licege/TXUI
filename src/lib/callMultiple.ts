import { isFunction } from './util';

export const callMultiple =
  (...fns: any[]) =>
    (...args: any[]) =>
      fns
        .filter((f) => isFunction(f))
        .forEach((f) => f(...args));
