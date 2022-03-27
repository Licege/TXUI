import React from 'react';

export interface DOMContentInterface {
    window?: Window;
    document?: Document;
}

export type DOMProps = DOMContentInterface;

export const canUseDom = Boolean(
    typeof window !== 'undefined' && window.document && window.document.createElement
);

export const canUseEventListeners = canUseDom && Boolean(window.addEventListener);

export function onDOMLoaded(cb: (...args: any[]) => any) {
    if (document.readyState !== 'loading') {
        cb();
    } else {
        document.addEventListener('DOMContentLoaded', cb);
    }
}

export const getDOM = () => ({
    window: canUseDom ? window : undefined,
    document: canUseDom ? document : undefined
});

export const DOMContext = React.createContext<DOMContentInterface>(getDOM());

export const useDOM = () => {
    return React.useContext(DOMContext);
};

export function blurActiveElement(document: Document | undefined) {
    if (document && document.activeElement) {
        (document.activeElement as HTMLElement).blur()
    }
}