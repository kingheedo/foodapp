import {colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import backUrl from '@/utils/backUrl';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Config from 'react-native-config';
import WebView, {WebViewNavigation} from 'react-native-webview';

const REDIRECT_URI = `${backUrl}/auth/oauth/kakao`;

const KakaoLoginScreen = () => {
  const {kakaoLoginMutation} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigateLoading, setIsNavigateLoading] = useState(false);
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const requestToken = async (authorizedCode: string) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        params: {
          grant_type: 'authorization_code',
          client_id: Config.KAKAO_REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: authorizedCode,
        },
      });
      if (response) {
        kakaoLoginMutation.mutate(response.data.access_token);
      }
    } catch (err) {
      console.log('token 발급 오류 발생', err);
    }
  };

  const handleNavigationStateChange = async (event: WebViewNavigation) => {
    if (event.url.includes(`${REDIRECT_URI}?code=`)) {
      setIsLoading(true);
      setIsNavigateLoading(event.loading);
      const authorizedCode = event.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(authorizedCode);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isNavigateLoading) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size={'small'} color={colors[theme].BLACK} />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'yellow',
      flex: 1,
    },
    kakaoLoadingContainer: {
      backgroundColor: colors[theme].WHITE,
      height: Dimensions.get('window').height,
      paddingBottom: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default KakaoLoginScreen;
