const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  KAKAO: 'Kakao',
  SIGNUP: 'Signup',
} as const;

const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
  SETTING: 'Setting',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
  SEARCH_LOCATION: 'SearchLocation',
} as const;

const feedNavigations = {
  FEED_HOME: 'FeedHome',
  FEED_DETAIL: 'FeedDetail',
  POST_EDIT: 'PostEdit',
  IMAGE_ZOOM: 'ImageZoom',
} as const;

const feedBottomTabNavigations = {
  FEED_HOME: 'FeedBottomTabHome',
  FEED_SEARCH: 'FeedSearch',
  FEED_FAVORITE: 'FeedFavorite',
} as const;

const settingNavigatons = {
  SETTING_HOME: 'SettingHome',
  EDIT_PROFILE: 'EditProfile',
  EDIT_CATEGORY: 'EditCategory',
  DELETE_ACCOUNT: 'DeleteAccount',
} as const;

export {
  authNavigations,
  mainNavigations,
  mapNavigations,
  feedNavigations,
  feedBottomTabNavigations,
  settingNavigatons,
};
