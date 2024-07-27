import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import useAppState from './useAppState';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.566535,
    longitude: 126.9779692,
  });
  const [isLocationError, setIsLocationError] = useState(false);
  const {isComeBack} = useAppState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        setUserLocation({
          latitude,
          longitude,
        });
        setIsLocationError(false);
      },
      error => {
        if (error) {
          setIsLocationError(true);
        }
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );
  }, [isComeBack]);

  return {
    userLocation,
    isLocationError,
  };
};

export default useUserLocation;
