import React, {useEffect} from 'react';
import useAuth from '@/hooks/queries/useAuth';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import SplashScreen from 'react-native-splash-screen';

const RootNavigator = () => {
  const {isLogin, isLoginLoading} = useAuth();

  useEffect(() => {
    console.log('SplashScreen Module:', SplashScreen); // ✅ SplashScreen이 undefined인지 확인
    if (!isLoginLoading) {
      setTimeout(() => {
        try {
          SplashScreen.hide();
        } catch (error) {
          console.error('SplashScreen Error:', error);
        }
      }, 500);
    }
  }, [isLoginLoading]);

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
};

export default RootNavigator;
