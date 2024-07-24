import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';

const MapHomeScreen = () => {
  const {logoutMutation} = useAuth();
  return (
    <View>
      <Text>MapHomeScreen</Text>
      <Button title="로그아웃" onPress={() => logoutMutation.mutate(null)} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MapHomeScreen;
