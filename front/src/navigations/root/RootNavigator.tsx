import React from 'react';
import useAuth from '@/hooks/queries/useAuth';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

const RootNavigator = () => {
  const {isLogin} = useAuth();
  return (
    <RetryErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
};

export default RootNavigator;
