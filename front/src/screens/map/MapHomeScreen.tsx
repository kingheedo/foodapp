import React, {useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {colors, mapNavigations} from '@/constants';
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
import CustomMarker from '@/components/CustomMarker';
import {alerts} from '@/constants/messages';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/MarkerModal';
import useModal from '@/hooks/useModal';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen = () => {
  const mapRef = useRef<MapView | null>(null);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {userLocation, isLocationError} = useUserLocation();
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [markerId, setMarkerId] = useState<number | null>(null);
  const {data: markers = []} = useGetMarkers();
  const markerModal = useModal();
  usePermission(PermissionType.LOCATION);

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectedLocation(nativeEvent.coordinate);
  };

  const handlePressMarker = (id: number) => {
    setMarkerId(id);
    markerModal.handleOpen();
  };

  const handleselectedLocation = () => {
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

  const handleAddLocation = () => {
    if (selectedLocation === null) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.title,
        alerts.NOT_SELECTED_LOCATION.description,
      );
    }

    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectedLocation,
    });
    setSelectedLocation(null);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...userLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id)}
          />
        ))}
        {selectedLocation && (
          <CustomMarker color="RED" coordinate={selectedLocation} />
        )}
      </MapView>

      <MarkerModal
        markerId={markerId}
        visible={markerModal.open}
        handleClose={markerModal.handleClose}
      />

      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handleAddLocation}>
          <MaterialIcons name="add" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handleselectedLocation}>
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
    </>
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
