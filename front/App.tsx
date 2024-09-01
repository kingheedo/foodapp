import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import Toast from 'react-native-toast-message';
import toastConfig from '@/config/toastConfig';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig}/>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
