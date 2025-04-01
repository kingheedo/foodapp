import {initialMarkerFilter, storageKeys} from '@/constants';
import useMarkerFilterStore from '@/store/useMarkerFilterStore';
import {Marker} from '@/types/domain';
import {getEncryptedStorage, setEncryptedStorage} from '@/utils';
import {useEffect} from 'react';

const useMarkerFilter = () => {
  const {filter, setFilter} = useMarkerFilterStore();

  const transformMarker = (marker: Marker[]) => {
    return marker.filter(
      marker =>
        filter[marker.color] === true &&
        filter[String(marker.score) as keyof typeof initialMarkerFilter] ===
          true,
    );
  };

  const set = async (name: keyof typeof initialMarkerFilter) => {
    setFilter(name);
    await setEncryptedStorage(storageKeys.MAKER_FILTER, {
      ...filter,
      [name]: !filter[name],
    });
  };

  const getStoragefilterItem = async () => {
    const storagefilterItem =
      (await getEncryptedStorage(storageKeys.MAKER_FILTER)) ??
      initialMarkerFilter;
    setFilter(storagefilterItem);
  };

  useEffect(() => {
    getStoragefilterItem();
  }, []);

  return {
    filter,
    set,
    transformMarker,
  };
};

export default useMarkerFilter;
