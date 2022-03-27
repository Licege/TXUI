import React from 'react';
import classNames from 'classnames';

export type FocusVisibleMode = 'inside' | 'outside';

interface FocusVisibleProps {
  mode: FocusVisibleMode
}

export const FocusVisible: React.FC<FocusVisibleProps> = ({
  mode
}: FocusVisibleProps) => (
  <span
    aria-hidden="true"
    className={classNames('FocusVisible', `FocusVisible--${mode}`)}
  />
);
