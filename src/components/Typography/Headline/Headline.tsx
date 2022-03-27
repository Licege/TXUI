import React from 'react';
import classNames from 'classnames';
import { HasComponent } from '../../../types';
import { usePlatform } from '../../../hooks/usePlatform';
import { getClassName } from '../../../helpers/getClassName';
import './Headline.css'

export interface HeadlineProps extends React.AllHTMLAttributes<HTMLElement>,
  HasComponent {
  weight: 'regular' | 'medium' | 'semibold'
}

const Headline: React.FC<HeadlineProps> = ({
  children,
  weight = 'regular',
  Component = 'h3',
  ...restProps
}: HeadlineProps) => {
  const platform = usePlatform();

  return (
    <Component
      {...restProps}
      className={classNames(
        getClassName('Headline', platform),
        `Headline--w-${weight}`
      )}
    >
      {children}
    </Component>
  );
};

export default Headline;
