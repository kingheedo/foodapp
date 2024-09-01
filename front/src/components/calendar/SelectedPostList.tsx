import { CalendarPost } from '@/api';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SelectedPost from './SelectedPost';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SelectedPostListProps {
    posts: CalendarPost[]
}

const SelectedPostList = ({posts}: SelectedPostListProps) => {
    const insets = useSafeAreaInsets();
  return (
    <ScrollView scrollIndicatorInsets={{right:1}}>
        <View style={[styles.container, {marginBottom: insets.bottom + 30}]}>
            {posts.map(post => (
                <SelectedPost key={post.id} post={post}/>
            ))}
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        gap: 12
    }
});

export default SelectedPostList;