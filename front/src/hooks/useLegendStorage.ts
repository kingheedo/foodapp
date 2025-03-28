import {storageKeys} from '@/constants';
import useLegendStore from '@/store/useLegendStore';
import {getEncryptedStorage, setEncryptedStorage} from '@/utils';
import {useEffect} from 'react';

const useLegendStorage = () => {
  const {isVisible, setIsVisible} = useLegendStore();

  const onChangeLegend = async (legend: boolean) => {
    await setEncryptedStorage(storageKeys.SHOW_LEGEND, legend);
    setIsVisible(legend);
  };

  const initialLegend = async () => {
    const storedLegend =
      (await getEncryptedStorage(storageKeys.SHOW_LEGEND)) ?? false;
    setIsVisible(storedLegend);
  };

  useEffect(() => {
    initialLegend();
  }, [setIsVisible]);

  return {
    showLegend: isVisible,
    onChangeLegend,
  };
};

export default useLegendStorage;
