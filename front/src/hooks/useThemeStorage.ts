import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import {getEncryptedStorage, setEncryptedStorage} from '@/utils';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';

const useThemeStorage = () => {
  const systemTheme = useColorScheme();
  const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore();

  const setMode = async (mode: ThemeMode) => {
    await setEncryptedStorage('themeMode', mode);
    setTheme(mode);
  };

  const setSystem = async (system: boolean) => {
    await setEncryptedStorage('themeSystem', system);
    setSystemTheme(system);
  };

  const callTheme = async () => {
    const mode = (await getEncryptedStorage('themeMode')) || 'light';
    const systemMode = (await getEncryptedStorage('themeSystem')) ?? false;
    const currentMode = systemMode ? systemTheme : mode;
    setTheme(currentMode);
    setSystemTheme(systemMode);
  };

  useEffect(() => {
    callTheme();
  }, [setTheme, setSystemTheme, getEncryptedStorage, systemTheme]);

  return {
    theme,
    isSystem,
    setMode,
    setSystem,
  };
};

export default useThemeStorage;
