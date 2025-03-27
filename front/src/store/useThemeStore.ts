import {ThemeMode} from '@/types/common';
import React from 'react';
import {create} from 'zustand';

interface ThemeStore {
  theme: ThemeMode;
  isSystem: boolean;
  setTheme: (theme: ThemeMode) => void;
  setSystemTheme: (system: boolean) => void;
}

const useThemeStore = create<ThemeStore>(set => ({
  theme: 'light',
  isSystem: false,
  setTheme: (theme: ThemeMode) => {
    set(state => ({
      ...state,
      theme,
    }));
  },
  setSystemTheme: (system: boolean) => {
    set(state => ({
      ...state,
      isSystem: system,
    }));
  },
}));

export default useThemeStore;
