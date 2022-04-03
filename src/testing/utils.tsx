import React from 'react';
import { AdaptivityProps } from '../components/AdaptivityProvider/AdaptivityContext';
import { AdaptivityProvider } from '../components/AdaptivityProvider/AdaptivityProvider';
import { render, RenderResult, screen } from '@testing-library/react';

export function fakeTimers() {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());
}

export type ComponentTestOptions = {
  defaultProps?: any;
  forward?: boolean;
  domAttr?: boolean;
  className?: boolean;
  style?: boolean;
  adaptivity?: AdaptivityProps;
}

type BasicProps = { style?: any; className?: any };

export function mountTest(Component: React.ComponentType<any>) {
  it('renders', () => {
    let api: RenderResult;

    // mount
    expect(() => (api = render(<Component />))).not.toThrow();

    // update
    expect(() => api.rerender(<Component />)).not.toThrow();

    // unmount
    expect(() => api.unmount()).not.toThrow();
  })
}

export function baselineComponent<Props extends BasicProps>(
  RawComponent: React.ComponentType<Props>,
  {
    forward = true,
    style = true,
    className = true,
    domAttr = true,
    adaptivity
  }: ComponentTestOptions = {}
) {
  const Component: React.ComponentType<any> = adaptivity
    ? (p: Props) => (
      <AdaptivityProvider {...adaptivity}>
        <RawComponent {...p} />
      </AdaptivityProvider>
    )
    : RawComponent;

  mountTest(Component);

  if (forward) {
    it('forwards attributes', () => {
      const cls = 'Custom';

      const { rerender } = render(
        <Component
          data-testid='__cmp__'
          className={cls}
          style={{ background: 'green' }}
        />
      );

      domAttr && expect(screen.queryByTestId('__cmp__')).toBeTruthy();

      if (className || style) {
        const styledNode = document.getElementsByClassName(
          cls
        )[0] as HTMLElement;

        className && expect(styledNode).toBeTruthy();

        const customClassList = Array.from(styledNode.classList).filter(
          (item) => item !== cls
        );

        style && expect(styledNode.style.background).toBe('green');

        const customStyleCount = styledNode.style.length;

        rerender(<Component />);

        className && expect(Array.from(styledNode.classList)).toEqual(customClassList);
        style && expect(styledNode.style.length).toEqual(
          styledNode.style.background
            ? customStyleCount
            : customStyleCount - 1
        );
      }
    });
  }
}
