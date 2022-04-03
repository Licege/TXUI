import React from 'react';
import { HasComponent } from '../../../types';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import classNames from 'classnames';

export interface SubheadProps extends React.AllHTMLAttributes<HTMLElement>,
  HasComponent {
  weight?: '1' | '2' | '3';
}

const Subhead: React.FC<SubheadProps> = ({
  children,
  weight,
  Component = 'h5',
  ...restProps
}) => {
  const { sizeY } = useAdaptivity();

  return (
    <Component
      {...restProps}
      className={classNames(
        'Subhead',
        `Subhead--sizeY-${sizeY}`,
        `Subhead--w-${weight}`
      )}
    >
      {children}
    </Component>
  );
};

export default Subhead;
