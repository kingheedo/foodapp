import InputField from '@/components/common/InputField';
import FeedList from '@/components/feed/FeedList';
import {colors, feedBottomTabNavigations} from '@/constants';
import useGetSearchPosts from '@/hooks/queries/useGetSearchPosts';
import useForm from '@/hooks/useForm';
import {FeedBottomTabParmList} from '@/navigations/bottomTab/FeedBottomTabNavigator';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <Pressable style={styles.menuContainer} onPress={handleDrawerBtn}>
            <Ionicons name="menu" color={colors.BLACK} size={25} />
          </Pressable>
          <View style={styles.inputContainer}>
            <InputField
              style={styles.input}
              placeholder="주소 또는 제목으로 검색"
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
        <View
          style={{
            marginTop: 48,
          }}>
          <FeedList
            posts={posts?.pages.flat() || []}
            handleNextPage={handleNextPage}
            handleRefetch={handleRefetch}
            emptyMessage="검색결과에 해당하는 피드가 존재하지 않습니다."
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    position: 'relative',
    marginTop: 20,
  },
  menuContainer: {
    width: 38,
    height: 38,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  searchContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
    backgroundColor: colors.WHITE,
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
