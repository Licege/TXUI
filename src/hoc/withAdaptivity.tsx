import React from 'react';
import {
  AdaptivityContext,
  AdaptivityContextInterface,
  AdaptivityProps,
  SizeProps, SizeType, ViewHeight, ViewWidth
} from '../components/AdaptivityProvider/AdaptivityContext';

interface Config {
  sizeX?: boolean;
  sizeY?: boolean;
  viewWidth?: boolean;
  viewHeight?: boolean;
  hasMouse?: boolean;
  deviceHasHover?: boolean;
}

export function withAdaptivity<T extends AdaptivityProps>(
  TargetComponent: React.ComponentType<T>,
  config: Config
): React.FC<Omit<T, keyof AdaptivityContextInterface> & SizeProps> {
  const AdaptivityConsumer: React.ComponentType<
    Omit<T, keyof AdaptivityContextInterface> & SizeProps
  > = (props: Omit<T, keyof AdaptivityContextInterface> & SizeProps) => {
    const context = React.useContext(AdaptivityContext);
    let update = false;

    if (props.sizeX || props.sizeY) {
      update = true;
    }

    const sizeX = props.sizeX || context.sizeX;
    const sizeY = props.sizeY || context.sizeY;
    const viewWidth = context.viewWidth;
    const viewHeight = context.viewHeight;
    const hasMouse = context.hasMouse;
    const deviceHasHover = context.deviceHasHover;

    const adaptivityProps: {
      sizeX?: SizeType;
      sizeY?: SizeType;
      viewWidth?: ViewWidth;
      viewHeight?: ViewHeight;
      hasMouse?: boolean;
      deviceHasHover?: boolean;
    } = {};

    config.sizeX ? (adaptivityProps.sizeX = sizeX) : undefined;
    context.sizeY ? (adaptivityProps.sizeY = sizeY) : undefined;
    context.viewWidth ? (adaptivityProps.viewWidth = viewWidth) : undefined;
    context.viewHeight ? (adaptivityProps.viewHeight = viewHeight) : undefined;
    context.hasMouse ? (adaptivityProps.hasMouse = hasMouse) : undefined;
    context.deviceHasHover ? (adaptivityProps.deviceHasHover = deviceHasHover) : undefined;

    const target = <TargetComponent {...(props as T)} {...adaptivityProps} />;

    if (update) {
      return (
        <AdaptivityContext.Provider
          value={{
            sizeX,
            sizeY,
            viewWidth,
            viewHeight,
            hasMouse,
            deviceHasHover
          }}
        >
          {target}
        </AdaptivityContext.Provider>
      )
    }

    return target;
  }

  return AdaptivityConsumer;
}
