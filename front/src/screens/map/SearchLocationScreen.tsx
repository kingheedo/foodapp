import InputField from '@/components/common/InputField';
import SearchLocationList from '@/components/map/SearchLocationList';
import useDebounce from '@/hooks/useDebounce';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import React, { useState } from 'react';
import {Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';

interface SearchLocationScreenProps {

}

const SearchLocationScreen = ({}: SearchLocationScreenProps) => {
  const [keyword, setKeyword] = useState('');
  const debounceValue = useDebounce(keyword);
  const {userLocation} = useUserLocation();
  const {addressInfo, fetchPrevPage, fetchNextPage} = useSearchLocation({keyword: debounceValue ,location:userLocation});

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  }
  
  return (
    <View style={styles.container}>
      <InputField placeholder='검색할 장소를 입력하세요.' autoFocus value={keyword} onChangeText={handleChangeKeyword} onSubmitEditing={() => Keyboard.dismiss()}/>
      <SearchLocationList list={addressInfo && addressInfo.documents || []}/>
      <View style={styles.paginationControls}>
        <Pressable onPress={fetchPrevPage}><Text>이전 페이지</Text></Pressable>
        <Pressable onPress={fetchNextPage}><Text>다음 페이지</Text></Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20
  },
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default SearchLocationScreen;