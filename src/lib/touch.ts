import { canUseDom } from './dom';

export interface TXUITouchEvent extends MouseEvent, TouchEvent {}
export type TXUITouchEventHandler = (e: TXUITouchEvent) => void;

const coordX = (e: TXUITouchEvent): number => {
  if (e.clientX != null) {
    return e.clientX;
  }

  return e.changedTouches && e.changedTouches[0].clientX;
}

const coordY = (e: TXUITouchEvent): number => {
  if (e.clientY != null) {
    return e.clientY;
  }

  return e.changedTouches && e.changedTouches[0].clientY;
}

const touchEnabled = () => canUseDom && 'ontouchstart' in window;

function getSupportedEvents(): string[] {
  if (touchEnabled()) {
    return ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
  }

  return ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
}

/*
 * Рассчитывает "сопротивление" для iOS тач-событий
 */
function rubber(
  offset: number,
  dimension: number,
  resistanceRate: number,
  isAndroid: boolean
): number {
  if (isAndroid || offset < 0) {
    return offset;
  }

  const offsettedResistance = offset * resistanceRate;
  return (offsettedResistance * dimension) / (offsettedResistance + dimension);
}

export { getSupportedEvents, coordX, coordY, touchEnabled, rubber };
