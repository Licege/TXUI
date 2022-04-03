import React from 'react';
import { screen, render } from '@testing-library/react';
import Tappable, { TappableProps } from './Tappable';
import { baselineComponent, fakeTimers } from '../../testing/utils';

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
})
