import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  setMoveLocation: (location: LatLng) =>
    set(state => ({...state, moveLocation: location})),
}));

export default useLocationStore;
