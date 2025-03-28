import React from 'react';
import {create} from 'zustand';

type LegendState = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const useLegendStore = create<LegendState>(set => ({
  isVisible: false,
  setIsVisible: (isVisible: boolean) => {
    set({
      isVisible,
    });
  },
}));

export default useLegendStore;
