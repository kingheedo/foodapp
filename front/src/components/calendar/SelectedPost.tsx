import { CalendarPost } from '@/api';
import { colors, feedBottomTabNavigations, feedNavigations, mainNavigations } from '@/constants';
import { FeedBottomTabParmList } from '@/navigations/bottomTab/FeedBottomTabNavigator';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

interface SelectedPostProps {
    post: CalendarPost
}

type Navigation = CompositeNavigationProp<
    DrawerNavigationProp<MainDrawerParamList>,
    BottomTabNavigationProp<FeedBottomTabParmList>
>

const SelectedPost = ({post}: SelectedPostProps) => {
    const navigation = useNavigation<Navigation>();
    /** post 클릭 시 post상세페이지로 이동 */
    const handlePressPost = () => {
        navigation.navigate(mainNavigations.FEED, {
          screen: feedBottomTabNavigations.FEED_HOME,
          params: {
            screen: feedNavigations.FEED_DETAIL,
            params: {
                id: Number(post.id)
            },
            initial: false
          }
        })
    }
  return (
    <Pressable onPress={handlePressPost} style={styles.container}>
        <View style={styles.verticalBar}/>
        <View style={styles.contentContainer}>
            <View style={styles.addressContainer}>
                <Octicons name="location" color={colors.GRAY_500} size={14} />
                <Text style={styles.addressText} numberOfLines={1} ellipsizeMode='tail'>
                    {post.address}
                </Text>
            </View>
            <Text style={styles.titleText}>
                {post.title}
            </Text>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBlockColor: colors.GRAY_200,
        gap: 10,
        marginHorizontal: 16,
        paddingVertical: 5
        
    },
    verticalBar:{
        width: 7,
        backgroundColor: colors.CYAN_700,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
    contentContainer:{
        paddingTop: 5,
        paddingBottom: 11
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    addressText:{
        fontSize: 13,
        color: colors.GRAY_500
    },
    titleText:{
        fontSize: 16,
        color: colors.BLACK,
        fontWeight: '600'
    }
});

export default SelectedPost;