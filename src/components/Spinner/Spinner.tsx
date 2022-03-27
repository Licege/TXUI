import React from 'react';
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from '../../icons';
import { usePlatform } from '../../hooks/usePlatform';
import { getClassName } from '../../helpers/getClassName';
import './Spinner.css';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement>{
  size?: 'small' | 'regular' | 'large' | 'medium';
}

const Spinner: React.FC<SpinnerProps> = ({
  size,
  ...restProps
}: SpinnerProps) => {
  const platform = usePlatform();

  let SpinnerIcon = Icon24Spinner;

  if (size === 'large') {
    SpinnerIcon = Icon44Spinner;
  }

  if (size === 'medium') {
    SpinnerIcon = Icon32Spinner;
  }

  if (size === 'small') {
    SpinnerIcon = Icon16Spinner;
  }

  return (
    <span
      role='status'
      {...restProps}
      className={getClassName('Spinner', platform)}
    >
      <div role='presentation' aria-hidden='true' className='Spinner__self'>
        <SpinnerIcon />
      </div>
    </span>
  )
}

Spinner.defaultProps = {
  size: 'regular',
  'aria-label': 'Загружается...'
}

export default Spinner;
