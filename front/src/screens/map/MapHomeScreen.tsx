import React, {useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {colors} from '@/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission, {PermissionType} from '@/hooks/usePermission';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/styles/mapStyle';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen = () => {
  const mapRef = useRef<MapView | null>(null);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {logoutMutation} = useAuth();
  const {userLocation, isLocationError} = useUserLocation();
  usePermission(PermissionType.LOCATION);

  const handlePressLocation = () => {
    if (isLocationError) {
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 37.566535,
          longitude: 126.9779692,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
      />
      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    backgroundColor: colors.CYAN_700,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.CYAN_700,
    width: 48,
    height: 48,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    elevation: 2,
  },
});

export default MapHomeScreen;
