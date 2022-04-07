import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useModalManager } from './useModalManager';
import { noop } from '../../lib/util';
import { fakeTimers } from '../../testing/utils';
import { ModalType } from './types';

const MockModal = (p: any) => <div {...p} />;

describe(useModalManager, () => {
  fakeTimers();
  describe('manages multi-phase transition', () => {
    const modals = [
      <MockModal id='m1' key='m1' />,
      <MockModal id='m2' key='m2' />
    ];

    it('can enter on mount', () => {
      const handle = renderHook(({ id }) => useModalManager(id, modals, noop), {
        initialProps: { id: 'm1' },
      });

      expect(handle.result.current).toMatchObject({
        activeModal: 'm1',
        enteringModal: 'm1',
        exitingModal: null,
        delayEnter: false
      });

      act(() => {
        handle.result.current.onEnter('m1');
      });

      expect(handle.result.current).toMatchObject({
        activeModal: 'm1',
        enteringModal: null,
        exitingModal: null
      });
    });

    it('can enter on update', () => {
      const handle = renderHook(({ id }) => useModalManager(id, modals, noop), {
        initialProps: { id: null as string | null }
      });

      expect(handle.result.all).toMatchObject([
        { activeModal: null, enteringModal: null, exitingModal: null }
      ]);

      handle.rerender({ id: 'm1' });

      expect(handle.result.current).toMatchObject({
        activeModal: 'm1',
        enteringModal: 'm1',
        exitingModal: null,
        delayEnter: false
      });

      act(() => {
        handle.result.current.onEnter('m1');
      });

      expect(handle.result.current).toMatchObject({
        activeModal: 'm1',
        enteringModal: null,
        exitingModal: null
      });
    });

    const flushMount = (initId: string | null = null) => {
      const handle = renderHook(({ id }) => useModalManager(id, modals, noop), {
        initialProps: { id: initId }
      });

      act(() => {
        handle.result.current.onEnter(initId);
      });

      return handle;
    };

    it('can exit', () => {
      const handle = flushMount('m1');

      handle.rerender({ id: null });

      expect(handle.result.current).toMatchObject({
        activeModal: null,
        enteringModal: null,
        exitingModal: 'm1'
      });

      act(() => {
        handle.result.current.onExit('m1');
      });

      expect(handle.result.current).toMatchObject({
        activeModal: null,
        enteringModal: null,
        exitingModal: null
      });
    });

    it.each([
      [ModalType.CARD, ModalType.CARD, true],
      [ModalType.PAGE, ModalType.PAGE, false]
    ])('transitions %s -> %s with delay=$s', (t1, t2, delayEnter) => {
      const handle = flushMount('m1');

      handle.result.current.getModalState('m1').type = t1;
      handle.result.current.getModalState('m2').type = t2;

      handle.rerender({ id: 'm2' });

      expect(handle.result.current).toMatchObject({
        activeModal: 'm2',
        enteringModal: 'm2',
        exitingModal: 'm1',
        delayEnter
      });

      act(() => {
        handle.result.current.onExit('m1');
      });

      expect(handle.result.current).toMatchObject({
        activeModal: 'm2',
        enteringModal: 'm2',
        exitingModal: null
      });

      act(() => {
        handle.result.current.onEnter('m2');
      });

      expect(handle.result.current).toMatchObject({
        activeModal: 'm2',
        enteringModal: null,
        exitingModal: null
      });
    });
  });
});
