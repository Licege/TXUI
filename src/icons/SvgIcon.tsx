import React from 'react';
import classNames from 'classnames';

interface SvgIconProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  fill?: number;
  getRootRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>;
  Component?: React.ElementType;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  children,
  width = 0,
  height = 0,
  fill,
  getRootRef,
  style = {},
  className = '',
  Component = 'div',
  ...restProps
}: SvgIconProps) => {
  const size = Math.max(width, height);

  const classes = classNames('Icon', `Icon--${size}`, `Icon--w-${width}`, `Icon--h-${height}`);

  return (
    <Component
      role='presentation'
      {...restProps}
      ref={getRootRef}
      className={`${classes} ${className}`}
      style={{ ...style, width, height }}
    >
      {children}
    </Component>
  )
}

// interface SvgIconProps extends React.HTMLAttributes<HTMLDivElement> {
//   width?: number;
//   height?: number;
//   fill?: number;
//   getRootRef?: React.RefCallback<HTMLDivElement> | React.RefObject<HTMLDivElement>;
//   Component?: React.ElementType;
// }
//
// export function withSvgIcon<T>(
//   Component: React.ComponentType<T>
// ): React.FC<Omit<T, keyof SvgIconProps>> {
//   function WithSvgIcon(props: Omit<T, keyof SvgIconProps>) {
//     const { width } = props;
//
//     const size = Math.max(width, height);
//
//     const classes = classNames('Icon', `Icon--${size}`, `Icon--w-${width}`, `Icon--h-${height}`);
//
//     return (
//       <div
//         role='presentation'
//         {...restProps}
//         ref={getRootRef}
//         className={`${classes} ${className}`}
//         style={{ ...style, width, height }}
//       >
//         <Component {...(props as T)} />
//       </div>
//     )
//   }
//
//   return WithSvgIcon;
// }
