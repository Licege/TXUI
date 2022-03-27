import React from 'react';

export const generateRandomId = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");
};

export function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function debounce<A extends any[]>(fn: (...args: A) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: A) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export function setRef<T>(element: T, ref?: React.Ref<T>): void {
  if (ref) {
    if (isFunction(ref)) {
      ref(element);
    } else {
      (ref as React.MutableRefObject<T>).current = element;
    }
  }
}

export const noop = () => {};
