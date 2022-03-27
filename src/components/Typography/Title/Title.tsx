import React from 'react';
import classNames from 'classnames';
import { HasComponent } from '../../../types';
import './Title.css';

export interface TitleProps extends React.AllHTMLAttributes<HTMLElement>,
  HasComponent {
  weight?: '1'| '2' | '3',
  level: '1' | '2' | '3'
}

const Title: React.FC<TitleProps> = ({
  children,
  weight,
  level = '1',
  Component,
  ...restProps
}: TitleProps) => {
  if (!Component) {
    Component = ('h' + level) as React.ElementType;
  }

  return (
    <Component
      {...restProps}
      className={classNames('Title', `Title--l-${level}`, {
        [`Title--w-${weight}`]: !!weight
      })}
    >
      {children}
    </Component>
  );
};

export default Title;
