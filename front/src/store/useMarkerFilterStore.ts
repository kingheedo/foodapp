import {initialMarkerFilter, storageKeys} from '@/constants';
import {setEncryptedStorage} from '@/utils';
import {create} from 'zustand';

type UseMarkerFilterState = {
  filter: typeof initialMarkerFilter;
  setFilter: (name: keyof typeof initialMarkerFilter) => void;
};

const useMarkerFilterStore = create<UseMarkerFilterState>(set => ({
  filter: initialMarkerFilter,
  setFilter: async (name: keyof typeof initialMarkerFilter) => {
    set(state => ({
      ...state,
      filter: {
        ...state.filter,
        [name]: !state.filter[name],
      },
    }));
  },
}));

export default useMarkerFilterStore;
