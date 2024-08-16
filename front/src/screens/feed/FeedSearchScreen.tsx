import InputField from '@/components/common/InputField';
import {colors, feedBottomTabNavigations} from '@/constants';
import useGetSearchPosts from '@/hooks/queries/useGetSearchPosts';
import useForm from '@/hooks/useForm';
import {FeedBottomTabParmList} from '@/navigations/bottomTab/FeedBottomTabNavigator';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FeedSearchList from './FeedSearchList';

type FeedSearchScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<
      FeedBottomTabParmList,
      typeof feedBottomTabNavigations.FEED_SEARCH
    >,
    DrawerNavigationProp<MainDrawerParamList>
  >;
};

const FeedSearchScreen = ({navigation}: FeedSearchScreenProps) => {
  const {inputValues, getFormInputProps} = useForm({
    initialValue: {
      search: '',
    },
  });
  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetSearchPosts(inputValues.search);

  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefetch = () => {
    refetch();
  };

  const handleDrawerBtn = () => {
    navigation.openDrawer();
  };

  const ListHeaderComponet = (
    <View style={styles.headerContainer}>
      <Pressable style={styles.menuContainer} onPress={handleDrawerBtn}>
        <Ionicons name="menu" color={colors.BLACK} size={25} />
      </Pressable>
      <View style={styles.inputContainer}>
        <InputField
          style={styles.input}
          autoFocus
          placeholder="주소 또는 제목으로 검색"
          onSubmitEditing={() => Keyboard.dismiss()}
          {...getFormInputProps('search')}
        />
        <Octicons
          style={styles.searchIcon}
          name="search"
          size={25}
          color={colors.BLACK}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FeedSearchList
        posts={posts?.pages.flat() || []}
        handleNextPage={handleNextPage}
        handleRefetch={handleRefetch}
        emptyMessage="검색결과에 해당하는 피드가 존재하지 않습니다."
        headerComponent={ListHeaderComponet}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  menuContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 10,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    paddingRight: 40,
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
  },
});

export default FeedSearchScreen;
