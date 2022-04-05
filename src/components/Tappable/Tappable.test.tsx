import React from 'react';
import { screen, render, fireEvent, act } from '@testing-library/react';
import Tappable, { TappableProps } from './Tappable';
import { baselineComponent, fakeTimers } from '../../testing/utils';
import userEvent from '@testing-library/user-event';
import { AdaptivityProvider } from '../AdaptivityProvider/AdaptivityProvider';
import ConfigProvider from '../ConfigProvider/ConfigProvider';
import { ANDROID } from '../../lib/platform';

const TappableTest = (props: TappableProps) => (
  <Tappable data-testid='tappable' {...props} />
);
const tappable = () => screen.getByTestId('tappable');

fakeTimers();
afterEach(() => delete window['ontouchstart']);

describe.only('Tappable', () => {
  baselineComponent(TappableTest);

  it('Component: if no Component is passed Tappable becomes a div', () => {
    render(<TappableTest>Look, ma, no Component!</TappableTest>);
    expect(tappable().tagName.toLowerCase()).toMatch('div');
  });

  it('Component: if a href is passed w/ no Component Tappable becomes a native link', () => {
    render(<TappableTest href='#'>It is link</TappableTest>);
    expect(tappable().tagName.toLowerCase()).toMatch('a');
  });

  it('Component: if a href is passed w/ Component Tappable becomes a [Component]', () => {
    render(<TappableTest href='#' Component="div">It is div</TappableTest>);
    expect(tappable().tagName.toLowerCase()).toMatch('div');
  });

  it('a11y(role): role gets set for custom button', () => {
    render(<TappableTest>Custom Button</TappableTest>);
    expect(tappable()).toHaveAttribute('role', 'button');
  });

  it('a11y(role): default role gets reassigned', () => {
    render(<TappableTest role='link'>Custom Link</TappableTest>);
    expect(tappable()).toHaveAttribute('role', 'link');
  });

  it('a11y(role): role gets reset for native button', () => {
    render(<TappableTest Component='button'>Native Button</TappableTest>);
    expect(tappable()).not.toHaveAttribute('role');
  });

  it('a11y(role): role gets reset for native link', () => {
    render(<TappableTest href='#'>Native Link</TappableTest>);
    expect(tappable()).not.toHaveAttribute('role');
  });

  it('a11y(tabindex): custom button has tabindex={0}', () => {
    render(<TappableTest>Custom Button</TappableTest>);
    expect(tappable()).toHaveAttribute('tabIndex', '0');
  });

  it('a11y(tabindex): custom disabled button has no tabindex', () => {
    render(<TappableTest disabled>Custom Disabled Button</TappableTest>);
    expect(tappable()).not.toHaveAttribute('tabIndex');
  });

  it('a11y(tabindex): custom link has tabindex={0}', () => {
    render(<TappableTest role='link'>Custom Link</TappableTest>);
    expect(tappable()).toHaveAttribute('tabIndex', '0');
  });

  it('a11y(tabindex): positive tabIndex overrides default tabindex', () => {
    render(<TappableTest tabIndex={1}>Custom button has tabIndex {1}</TappableTest>);
    expect(tappable()).toHaveAttribute('tabIndex', '1');
  });

  it('a11y(tabindex): negative tabIndex overrides default tabindex', () => {
    render(<TappableTest tabIndex={-1}>Custom button has tabIndex {-1}</TappableTest>);
    expect(tappable()).toHaveAttribute('tabIndex', '-1');
  });

  it('a11y(tabindex): native button has no tabindex', () => {
    render(<TappableTest Component='button'>Native Button</TappableTest>);
    expect(tappable()).not.toHaveAttribute('tabIndex');
  });

  it('a11y(tabindex): native link has no tabindex', () => {
    render(<TappableTest href='#'>Native Link</TappableTest>);
    expect(tappable()).not.toHaveAttribute('tabIndex');
  });

  it('a11y(type): custom button has no type', () => {
    render(<TappableTest>Custom Button</TappableTest>);
    expect(tappable()).not.toHaveAttribute('type');
  });

  it('a11y(type): native button has default type="button"', () => {
    render(<TappableTest Component='button'>Native Button</TappableTest>);
    expect(tappable()).toHaveAttribute('type', 'button');
  });

  it('a11y(type): default type gets overwritten if type is passed to a native button', () => {
    render(<TappableTest Component='button' type='submit'>Submit button</TappableTest>);
    expect(tappable()).toHaveAttribute('type', 'submit');
  });

  it('a11y(type): type exists if passed to a non-button', () => {
    render(<TappableTest href='#' type='internal'>Go to anchor</TappableTest>);
    expect(tappable()).toHaveAttribute('type', 'internal');
  });

  it('a11y(disabled): custom Tappable element has aria-disabled', () => {
    render(<TappableTest disabled>Tappable w/ aria-disabled</TappableTest>);
    expect(tappable()).toHaveAttribute('aria-disabled', 'true');
  });

  it('a11y(button): custom button keyboard events', () => {
    const handleClick = jest.fn();
    render(<TappableTest onClick={handleClick}>Custom Button</TappableTest>)

    userEvent.tab();
    expect(tappable()).toHaveFocus();

    fireEvent.keyDown(tappable(), { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(tappable(), { key: ' ', code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  })

  it('a11y(link): custom link keyboard events', () => {
    const handleClick = jest.fn();
    render(<TappableTest role='link' onClick={handleClick}>Custom Link</TappableTest>);

    userEvent.tab();
    expect(tappable()).toHaveFocus();

    fireEvent.keyDown(tappable(), { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(tappable(), { key: ' ', code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Tappable calls onKeyDown prop', () => {
    const onKeyDown = jest.fn();
    render(<TappableTest Component='div' onKeyDown={onKeyDown} />);
    fireEvent.keyDown(tappable(), {});
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('disabled: default Tappable w/ disabled does not react to any events', () => {
    const handleClick = jest.fn();
    render(<TappableTest onClick={handleClick} disabled />);

    fireEvent.click(tappable());
    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(tappable(), { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  describe('active', () => {
    afterEach(() => jest.clearAllMocks());

    it('show waves on android', () => {
      const waveCount = () => document.querySelectorAll('.Tappable__wave').length;

      render(
        <AdaptivityProvider hasMouse={false}>
          <ConfigProvider platform={ANDROID}>
            <Tappable data-testid='x' />
          </ConfigProvider>
        </AdaptivityProvider>
      )

      userEvent.click(screen.getByTestId('x'));
      expect(waveCount()).toBe(1);

      userEvent.click(screen.getByTestId('x'));
      expect(waveCount()).toBe(2);

      act(() => {
        jest.runAllTimers();
      });

      expect(waveCount()).toBe(0);
    });

    const isActive = (element = tappable()) => element.classList.contains('Tappable--active');

    it('activates on click', () => {
      render(<TappableTest />);

      userEvent.click(tappable());
      expect(isActive()).toBe(true);

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(isActive()).toBe(false);
    });

    it('activates during longtap', () => {
      render(<TappableTest />);

      fireEvent.mouseDown(tappable());
      expect(isActive()).toBe(false);
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(isActive()).toBe(true);
      fireEvent.mouseUp(tappable());
      expect(isActive()).toBe(true);
    });

    it('does not activate on child Tappable click', () => {
      render(
        <Tappable data-testid='parent'>
          <Tappable data-testid='child' />
        </Tappable>
      );

      const child = screen.getByTestId('child');
      userEvent.click(child);
      expect(isActive(child)).toBe(true);
      const parent = screen.getByTestId('parent');
      expect(isActive(parent)).toBe(false);
    });

    describe('prevents early', () => {
      it('on slide', () => {
        render(<TappableTest />);

        fireEvent.mouseDown(tappable(), { clientX: 10 });
        act(() => {
          jest.runOnlyPendingTimers();
        });
        fireEvent.mouseDown(tappable(), { clientX: 40 });
        expect(isActive()).toBe(false);
      });

      it('on multi-touch', () => {
        window.ontouchstart = null;
        render(<TappableTest />);

        fireEvent.touchStart(tappable(), {
          touches: [{}],
          changedTouches: [{}]
        });
        act(() => {
          jest.runOnlyPendingTimers();
        });
        fireEvent.touchStart(tappable(), {
          touches: [{}, {}],
          changedTouches: [{}]
        });
        expect(isActive()).toBe(false);
      });

      it('on disable', () => {
        const h = render(<TappableTest />);

        fireEvent.mouseDown(tappable());
        act(() => {
          jest.runOnlyPendingTimers();
        });
        h.rerender(<TappableTest disabled />);
        expect(isActive()).toBe(false);
      });

      it('on child hover', () => {
        render(
          <TappableTest>
            <TappableTest data-testid='c' />
          </TappableTest>
        );

        fireEvent.mouseDown(tappable());
        act(() => {
          jest.runOnlyPendingTimers();
        });
        userEvent.hover(screen.getByTestId('c'));
        expect(isActive()).toBe(false);
      });
    });

    describe('hover', () => {
      const isHovered = (testId = 'x') =>
        screen
          .getByTestId(testId)
          .classList.contains('Tappable--hover-background');

      it('is not hovered by default', () => {
        render(<TappableTest data-testid='x' />);
        expect(isHovered()).toBe(false);
      });

      it('tracks mouse', () => {
        render(<TappableTest data-testid='x' />);

        userEvent.hover(screen.getByTestId('x'));
        expect(isHovered()).toBe(true);

        userEvent.unhover(screen.getByTestId('x'));
        expect(isHovered()).toBe(false);
      });

      describe('no hover when disabled', () => {
        describe.each([
          ['as form item', 'button'],
          ['as div', 'div']
        ] as const)('%s', (_, cmp) => {
          it('does not hover when disabled', () => {
            render(<TappableTest Component={cmp} data-testid='x' disabled />);

            userEvent.hover(screen.getByTestId('x'));
            expect(isHovered()).toBe(false);
          });

          it('suspends hover while disabled', () => {
            const h = render(<TappableTest Component={cmp} data-testid='x' />);

            userEvent.hover(screen.getByTestId('x'));
            h.rerender(<TappableTest Component={cmp} data-testid='x' disabled />);
            expect(isHovered()).toBe(false);

            h.rerender(<TappableTest Component={cmp} data-testid='x' />);
            expect(isHovered()).toBe(true);
          });

          it('tracks hover occurred while disabled', () => {
            const h = render(
              <TappableTest Component={cmp} data-testid='x' disabled />
            );

            userEvent.hover(screen.getByTestId('x'));
            h.rerender(<TappableTest Component={cmp} data-testid='x' />);
            expect(isHovered()).toBe(true);
          });
        });
      });

      describe('nested hover', () => {
        it('unhovers on child hover', () => {
          render(
            <TappableTest data-testid='x'>
              <TappableTest data-testid='y' />
            </TappableTest>
          );

          userEvent.hover(screen.getByTestId('y'));
          expect(isHovered()).toBe(false);

          fireEvent.pointerLeave(screen.getByTestId('y'));
          expect(isHovered()).toBe(true);
        });

        it('restores hover on child unmount', () => {
          const h = render(
            <TappableTest data-testid='x'>
              <TappableTest data-testid='y' />
            </TappableTest>
          );

          userEvent.hover(screen.getByTestId('x'));
          h.rerender(<TappableTest data-testid='x' />);
          expect(isHovered()).toBe(true);
        });

        describe('handles disabled children', () => {
          describe.each([
            ['as form item', 'button'],
            ['as div', 'div']
          ] as const)('%s', (_, cmp) => {
            it('hovers on disabled child hover', () => {
              const h = render(
                <TappableTest data-testid='x'>
                  <TappableTest data-testid='y' />
                </TappableTest>
              );

              userEvent.hover(screen.getByTestId('y'));
              h.rerender(
                <TappableTest data-testid='x'>
                  <TappableTest Component={cmp} data-testid='y' disabled />
                </TappableTest>
              )
              expect(isHovered()).toBe(true);

              h.rerender(
                <TappableTest data-testid='x'>
                  <TappableTest data-testid='y' />
                </TappableTest>
              )
              expect(isHovered()).toBe(false);
            });
          });
        });
      });
    });
  });
});
