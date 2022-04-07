export enum ModalType {
  PAGE = 'page',
  CARD = 'card'
}

export type TranslateRange = [number, number];

export type ModalsState = { [index: string]: ModalsStateEntry };

export interface ModalElements {
  modalElement?: HTMLElement | null,
  innerElement?: HTMLElement | null,
  headerElement?: HTMLElement | null,
  contentElement?: HTMLElement | null
}

export interface ModalsStateEntry extends ModalElements {
  id: string | null;
  onClose?: () => any;
  type?: ModalType;

  settingHeight?: number;
  dynamicComponentHeight?: boolean;
  expandable?: boolean;

  /**
   * Процент текущего сдвига модального окна
   */
  translateY?: number;
  /**
   * Процент сдвига модального окна в изначальном состоянии
   */
  translateYFrom?: number;
  /**
   * Процент сдвига модального окна во время взаимодействия с ней (потянуть, чтобы открыть или закрыть)
   */
  translateYCurrent?: number;

  touchStartCurrentScrollTop?: number;
  touchMovePositive?: boolean | null;
  touchShiftPercent?: number;

  expanded?: boolean;
  collapsed?: boolean;
  hidden?: boolean;

  contentScrolled?: boolean;
  contentScrollStopTimeout?: ReturnType<typeof setTimeout>;

  expandedRange?: TranslateRange;
  collapsedRange?: TranslateRange;
  hiddenRange?: TranslateRange;
}
