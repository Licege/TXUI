import React from 'react';
import classNames from 'classnames';
import { HasComponent } from '../../../types';
import { usePlatform } from '../../../hooks/usePlatform';
import { getClassName } from '../../../helpers/getClassName';
import './Caption.css';

export interface CaptionProps extends React.AllHTMLAttributes<HTMLElement>,
  HasComponent {
  weight: 'regular' | 'medium' | 'semibold' | 'bold';
  level: '1' | '2' | '3' | '4';
  caps?: boolean
}

const Caption: React.FC<CaptionProps> = ({
  children,
  weight = 'regular',
  level = '1',
  caps,
  Component = 'span',
  ...restParams
}: CaptionProps) => {
  const platform = usePlatform();

  return (
    <Component
      {...restParams}
      className={classNames(
        getClassName('Caption', platform),
        `Caption--w-${weight}`,
        `Caption--l-${level}`,
        {
          'Caption--caps': caps
        }
      )}
    >
      {children}
    </Component>
  )
}

export default Caption;
