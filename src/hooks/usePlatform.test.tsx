import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import ConfigProvider from '../components/ConfigProvider/ConfigProvider';
import { usePlatform } from './usePlatform';
import { ANDROID } from '../lib/platform';

describe(usePlatform, () => {
  it("returns ConfigProvider's platform", () => {
    const wrapper: React.FC = ({ children }) => (
      <ConfigProvider platform='ios'>{children}</ConfigProvider>
    );

    const { result } = renderHook(() => usePlatform(), { wrapper });

    expect(result.current).toEqual('ios');
  });

  it("handles ConfigProvider's undefined platform", () => {
    const wrapper: React.FC = ({ children }) => (
      <ConfigProvider platform={undefined}>{children}</ConfigProvider>
    );

    const { result } = renderHook(() => usePlatform(), { wrapper });

    expect(result.current).toEqual(ANDROID);
  });

  it("handles ConfigProvider's no platform", () => {
    const wrapper: React.FC = ({ children }) => (
      <ConfigProvider>{children}</ConfigProvider>
    );

    const { result } = renderHook(() => usePlatform(), { wrapper });

    expect(result.current).toEqual(ANDROID);
  });

  it('handles no ConfigProvider', () => {
    const { result } = renderHook(() => usePlatform());

    expect(result.current).toEqual(ANDROID);
  })
})
