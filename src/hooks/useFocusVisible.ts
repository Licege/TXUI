import React, { useCallback } from 'react';
import { AppRootContext } from '../components/AppRoot/AppRootContext';

export function useFocusVisible() {
  const [isFocused, setIsFocused] = React.useState(false);
  const { keyboardInput } = React.useContext(AppRootContext);

  const onFocus = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      event.stopPropagation();
      setIsFocused(true);
    },
    [setIsFocused]
  );

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      event.stopPropagation();
      setIsFocused(false);
    },
    [setIsFocused]
  );

  const focusVisible = keyboardInput && isFocused;

  return {
    focusVisible,
    onFocus,
    onBlur
  }
}
