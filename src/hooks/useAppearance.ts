import React from 'react';
import { AppearanceContext } from '../components/AppearanceProvider/AppearanceContext';

export const useAppearance = () => React.useContext(AppearanceContext);
