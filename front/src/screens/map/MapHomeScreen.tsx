import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import MapView, {
  LatLng,
  LongPressEvent,
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
import CustomMarker from '@/components/common/CustomMarker';
import {alerts} from '@/constants/messages';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import useModal from '@/hooks/useModal';
import MarkerModal from '@/components/map/MarkerModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import {numbers} from '@/constants/numbers';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {userLocation, isLocationError} = useUserLocation();
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [markerId, setMarkerId] = useState<number | null>(null);
  const {data: markers = []} = useGetMarkers();
  const markerModal = useModal();
  usePermission(PermissionType.LOCATION);
  const {mapRef, moveMapView, handleDelta} = useMoveMapView();

  /** 마커 길게 누를 시
   *
   * 1.해당 마커의 위치를 저장
   */
  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectedLocation(nativeEvent.coordinate);
  };

  /** 마커 클릭시
   *
   * 마커 id 저장,
   * 마커 모달이 열림
   */
  const handlePressMarker = (id: number) => {
    setMarkerId(id);
    markerModal.handleOpen();
  };

  /** 현재 내 위치로 이동 */
  const handleselectedLocation = () => {
    if (isLocationError) {
      return;
    }
    moveMapView({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    });
  };

  /** 장소 등록 핸들러 */
  const handleAddPost = () => {
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
          ...numbers.INITIAL_DETLTA,
        }}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleDelta}>
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
        <Pressable style={styles.mapButton} onPress={handleAddPost}>
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
