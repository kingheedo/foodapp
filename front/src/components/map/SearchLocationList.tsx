import {colors, mapNavigations} from '@/constants';
import {AddressResponse} from '@/types/kakaoMap';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import useLocationStore from '@/store/useLocationStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LatLng} from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';

type Navigation = StackNavigationProp<MapStackParamList>;

interface SearchLocationListProps {
  list: AddressResponse['documents'];
}

const SearchLocationList = ({list}: SearchLocationListProps) => {
  const {setSelectedLocation} = useLocationStore();
  const navigation = useNavigation<Navigation>();
  const {setMoveLocation} = useLocationStore();

  const onPressLocation = ({latitude, longitude}: LatLng) => {
    setMoveLocation({latitude, longitude});
    setSelectedLocation({latitude, longitude});
    navigation.goBack();
  };

  if (!list) {
    return null;
  }

  return (
    <View style={styles.container}>
      {list.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={true}
          indicatorStyle="black">
          {list.map((address, index) => (
            <Pressable
              onPress={() =>
                onPressLocation({
                  latitude: Number(address.y),
                  longitude: Number(address.x),
                })
              }
              style={[
                styles.locationItem,
                index === list.length - 1 && styles.lastLocationItem,
              ]}
              key={address.id}>
              <Octicons name="location" color={colors.CYAN_700} size={14} />
              <View>
                <View style={styles.addressHeader}>
                  <Text style={styles.placenameText} numberOfLines={1}>
                    {address.place_name}
                  </Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.subText}>
                    {(Number(address.distance) / 1000).toFixed(1)}km
                  </Text>
                  <Text style={styles.subText}>{address.category_name}</Text>
                </View>
                <Text style={styles.addressName}>
                  {address.road_address_name}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 5,
    width: '100%',
    height: Dimensions.get('screen').height / 2,
  },
  listContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  lastLocationItem: {
    borderBottomWidth: 0,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    gap: 5,
  },
  placenameText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  subText: {
    fontSize: 12,
    color: colors.GRAY_500,
    flexShrink: 1,
  },
  addressName: {
    color: colors.BLACK,
    fontSize: 12,
  },
  noResultContainer: {},
  noResultText: {},
});

export default SearchLocationList;
