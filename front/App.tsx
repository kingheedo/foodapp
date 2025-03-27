import {NavigationContainer, useTheme} from '@react-navigation/native';
import React from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import Toast from 'react-native-toast-message';
import toastConfig from '@/config/toastConfig';
import useThemeStore from '@/store/useThemeStore';

function App() {
  const {theme} = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig('light')} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
