import {numbers} from '@/constants/numbers';
import useLocationStore from '@/store/useLocationStore';
import {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

const useMoveMapView = () => {
  const mapRef = useRef<MapView | null>(null);
  const {moveLocation} = useLocationStore();
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DETLTA);

  /** 지도 뷰를 특정 위치로 이동 */
  const moveMapView = (location: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...location,
      ...(delta ?? regionDelta),
    });
  };

  /** 확대 축소 수치 핸들러 */
  const handleDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({
      latitudeDelta,
      longitudeDelta,
    });
  };

  useEffect(() => {
    if (moveLocation) {
      moveMapView({
        latitude: moveLocation.latitude,
        longitude: moveLocation.longitude,
      });
    }
  }, [moveLocation]);

  return {
    mapRef,
    moveMapView,
    handleDelta,
  };
};

export default useMoveMapView;
