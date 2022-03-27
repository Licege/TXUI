export interface OffsetRectInterface {
  top: number | undefined;
  left: number | undefined;
  width: number | undefined;
  height: number | undefined;
}

export function getOffsetRect(element: HTMLElement | null): OffsetRectInterface {
  const box = element?.getBoundingClientRect();

  return {
    top: box?.top,
    left: box?.left,
    width: box?.width,
    height: box?.height
  }
}
