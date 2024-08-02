import {errorMessages} from '@/constants/messages';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Config from 'react-native-config';

const useGetAddress = (location: LatLng) => {
  const [address, setAddress] = useState('');
  useEffect(() => {
    (async () => {
      console.log('Config.GOOGLE_MAP_API_KEY', Config.GOOGLE_MAP_API_KEY);

      try {
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${Config.GOOGLE_MAP_API_KEY}&language=ko`,
        );

        setAddress(data.results[0].formatted_address);
      } catch (error) {
        setAddress(errorMessages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [location]);

  return address;
};

export default useGetAddress;
