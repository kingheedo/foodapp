const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR: 'Calendar',
} as const;

const mapNavigations = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
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

export {
  authNavigations,
  mainNavigations,
  mapNavigations,
  feedNavigations,
  feedBottomTabNavigations,
};
