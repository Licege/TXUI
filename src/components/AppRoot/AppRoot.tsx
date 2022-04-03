import React from 'react';
import { withAdaptivity } from '../../hoc/withAdaptivity';
import { AdaptivityProps } from '../../hooks/useAdaptivity';
import { useKeyboardInputTracker } from '../../hooks/useKeyboardInputTracker';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { noop } from '../../lib/util';
import { SizeType } from '../AdaptivityProvider/AdaptivityContext';
import {
  elementScrollController,
  globalScrollController,
  ScrollContext,
  ScrollContextInterface
} from './ScrollContext';
import { AppRootContext } from './AppRootContext';
import classNames from 'classnames';

export interface AppRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<AdaptivityProps, 'sizeX' | 'hasMouse'> {
  mode?: 'partial' | 'embedded' | 'full';
  window?: Window;
  scroll?: 'global' | 'contain'
}

export const AppRoot = withAdaptivity<AppRootProps>(
  ({
    children,
    mode,
    sizeX,
    hasMouse,
    scroll = 'global',
    ...props
  }) => {
    const isKeyboardInputActive = useKeyboardInputTracker();
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [portalRoot, setPortalRoot] = React.useState<HTMLDivElement | null>(null);
    const { window, document } = useDOM();

    const initialized = React.useRef(false);
    if (!initialized.current) {
      if (document && mode === 'full') {
        document.documentElement.classList.add('txui');
      }
      initialized.current = true;
    }

    // setup portal
    useIsomorphicLayoutEffect(() => {
      const portal = document!.createElement('div');
      portal.classList.add('txui__portal-root');
      document!.body.appendChild(portal);
      setPortalRoot(portal);

      return () => {
        portal.parentElement?.removeChild(portal);
      }
    }, []);

    // setup root classes
    useIsomorphicLayoutEffect(() => {
      if (mode === 'partial') {
        return noop;
      }

      const parent = rootRef.current?.parentElement;
      const classes = ['txui__root'].concat(
        mode === 'embedded' ? 'txui__root--embedded' : []
      );
      parent?.classList.add(...classes);

      return () => {
        parent?.classList.remove(...classes);

        if (mode === 'full') {
          document?.documentElement.classList.remove('txui');
        }
      }
    }, []);

    // adaptivity handler
    useIsomorphicLayoutEffect(() => {
      if (mode === 'partial' || sizeX !== SizeType.REGULAR) {
        return noop;
      }

      const container =
        mode === 'embedded' ? rootRef.current?.parentElement : document!.body;
      container?.classList.add('txui--sizeX-regular');

      return () => container?.classList.remove('txui--sizeX-regular');
    }, [sizeX]);

    const scrollController = React.useMemo<ScrollContextInterface>(
      () =>
      scroll === 'contain'
        ? elementScrollController(rootRef)
        : globalScrollController(window, document),
      [document, scroll, window]
    );

    const content = (
      <AppRootContext.Provider
        value={{
          appRoot: rootRef,
          portalRoot: portalRoot,
          embedded: mode === 'embedded',
          keyboardInput: isKeyboardInputActive,
          mode
        }}
      >
        <ScrollContext.Provider value={scrollController}>
          {children}
        </ScrollContext.Provider>
      </AppRootContext.Provider>
    );

    return mode === 'partial' ? (
      content
    ) : (
      <div
        ref={rootRef}
        className={classNames('AppRoot', {
          'AppRoot--no-mouse': !hasMouse
        })}
        {...props}
      >
        {content}
      </div>
    )
  },
  {
    sizeX: true,
    hasMouse: true
  }
)
