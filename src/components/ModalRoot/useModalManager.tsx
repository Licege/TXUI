import React from 'react';
import { isFunction, noop } from '../../lib/util';
import { ModalsState, ModalsStateEntry, ModalType } from './types';
import { getNavId } from '../../lib/getNavId';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

interface ModalTransitionState {
  activeModal?: string | null;
  enteringModal?: string | null;
  exitingModal?: string | null;

  history?: string[];
  isBack?: boolean | null;
}

export interface ModalTransitionProps extends ModalTransitionState {
  onEnter: (id: string | null) => void;
  onExit: (id: string | null) => void;
  getModalState: (id: string) => ModalsStateEntry;
  closeActiveModal: VoidFunction;
  delayEnter: boolean;
}

function getModals(children: React.ReactNode | React.ReactNode[]) {
  return React.Children.toArray(children) as React.ReactElement[];
}

function modalTransitionReducer(
  state: ModalTransitionState,
  action: {
    type: 'setActive' | 'entered' | 'exited' | 'inited';
    id: string | null
  }
): ModalTransitionState {
  if (action.type === 'setActive' && action.id !== state.activeModal) {
    const nextModal = action.id;
    const prevModal = state.exitingModal || state.activeModal;

    let history = state.history ? [...state.history] : [];
    const isBack = Boolean(nextModal && history.includes(nextModal));

    if (nextModal === null) {
      history = []
    } else if (isBack) {
      history = history.splice(0, history.indexOf(nextModal) + 1);
    } else {
      history.push(nextModal);
    }

    return {
      activeModal: nextModal,
      enteringModal: null,
      exitingModal: prevModal,
      history,
      isBack
    };
  }

  if (action.type === 'entered' && action.id === state.enteringModal) {
    return { ...state, enteringModal: null };
  }

  if (action.type === 'exited' && action.id === state.exitingModal) {
    return { ...state, exitingModal: null };
  }

  if (action.type === 'inited' && action.id === state.activeModal) {
    return { ...state, enteringModal: action.id };
  }

  return state;
}

export function useModalManager(
  activeModal: string | null | undefined,
  children: React.ReactNode | React.ReactNode[],
  onClose: (id: string) => void,
  initModal: (state: ModalsStateEntry) => void = noop
): ModalTransitionProps {
  const modalsState = React.useRef<ModalsState>({}).current;

  getModals(children).forEach((Modal) => {
    const modalProps = Modal.props;
    const id = getNavId(modalProps);
    const state: ModalsStateEntry = (id !== undefined && modalsState[id]) || {
      id: id ?? null
    };

    state.onClose = Modal.props.onClose;
    state.dynamicComponentHeight = Boolean(modalProps.dynamicComponentHeight);

    if (typeof modalProps.settingHeight === 'number') {
      state.settingHeight = modalProps.settingHeight;
    }

    if (state.id !== null) {
      modalsState[state.id] = state;
    }
  });

  const isMissing = activeModal && !modalsState[activeModal];
  const safeActiveModal = isMissing ? null : activeModal;

  const [transitionState, dispatchTransition] = React.useReducer(
    modalTransitionReducer,
    {
      activeModal: safeActiveModal,
      enteringModal: null,
      exitingModal: null,
      history: safeActiveModal ? [safeActiveModal] : [],
      isBack: false
    }
  );

  useIsomorphicLayoutEffect(() => {
    dispatchTransition({ type: 'setActive', id: safeActiveModal ?? null });
  }, [activeModal]);

  useIsomorphicLayoutEffect(() => {
    if (transitionState.activeModal) {
      initModal(modalsState[transitionState.activeModal]);
      dispatchTransition({ type: 'inited', id: transitionState.activeModal });
    }
  }, [transitionState.activeModal]);

  const isCard = (id: string | null | undefined) => id != null && modalsState[id]?.type === ModalType.CARD;

  const onEnter = React.useCallback(
    (id: string | null) => dispatchTransition({ type: 'entered', id }),
    []
  );

  const onExit = React.useCallback(
    (id: string | null) => dispatchTransition({ type: 'exited', id }),
    []
  );

  const delayEnter = Boolean(
    transitionState.exitingModal &&
    (isCard(activeModal) || isCard(transitionState.exitingModal))
  );

  const getModalState = React.useCallback(
    (id: string) => modalsState[id],
    [modalsState]
  );

  function closeActiveModal() {
    const modalState = transitionState.activeModal && modalsState[transitionState.activeModal];

    if (modalState) {
      if (isFunction(modalState.onClose)) {
        modalState.onClose();
      } else if (isFunction(onClose)) {
        onClose(modalState.id);
      }
    }
  }

  return {
    onEnter,
    onExit,
    ...transitionState,
    delayEnter,
    getModalState,
    closeActiveModal
  }
}
