import React from 'react';
import { useDOM } from '../lib/dom';
import { Keys, pressedKey } from '../lib/accessibility';
import { useGlobalEventListener } from './useGlobalEventListeners';

export const ENABLE_KEYBOARD_INPUT_EVENT_NAME = 'enableKeyboardInputEventName';
export const DISABLE_KEYBOARD_INPUT_EVENT_NAME = 'disableKeyboardInputEventName';

export function useKeyboardInputTracker(): boolean {
  const { document } = useDOM();

  const [isKeyboardInputActive, toogleKeyboardInput] =
    React.useState(false);

  const enableKeyboardInput = React.useCallback(() => {
    toogleKeyboardInput(true);
  }, []);

  const handleKeydown = React.useCallback(
    (event: KeyboardEvent) => {
      if (pressedKey(event) === Keys.TAB) {
        enableKeyboardInput();
      }
    },
    [enableKeyboardInput]
  );

  const disableKeyboardInput = React.useCallback(() => {
    toogleKeyboardInput(false);
  }, []);

  const eventOptions = {
    passive: true,
    capture: true
  }

  useGlobalEventListener(
    document,
    'keydown',
    handleKeydown,
    eventOptions
  );

  useGlobalEventListener(
    document,
    'mousedown',
    disableKeyboardInput,
    eventOptions
  );

  useGlobalEventListener(
    document,
    'touchstart',
    disableKeyboardInput,
    eventOptions
  );

  useGlobalEventListener(
    document,
    ENABLE_KEYBOARD_INPUT_EVENT_NAME,
    enableKeyboardInput,
    eventOptions
  );

  useGlobalEventListener(
    document,
    DISABLE_KEYBOARD_INPUT_EVENT_NAME,
    disableKeyboardInput,
    eventOptions
  );

  return isKeyboardInputActive;
}
