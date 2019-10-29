export const ACTIONS = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  REGISTER: 'auth/register',

  GET_FILE_PATH: 'file/get',
  UPLOAD_FILE: 'file/upload',

  ANIMAL_TYPES: 'animal/getTypes',
  ANIMAL_LIST: 'animal/getList',
  ANIMAL_PAGE: 'animal/getFilteredPage',
  ANIMAL_OWN: 'animal/getOwn',
  ANIMAL_CREATE: 'animal/create',
  ANIMAL_GET: 'animal/get',

  USER_LIST: 'user/getList',
  USER_CREATE: 'user/create',
  USER_GET: 'user/get',
  USER_GET_PROFILE: 'user/getProfile',

  EVENT_LIST: 'event/getList',
  EVENT_GET: 'event/get',
  EVENT_SAVE: 'event/save',
  EVENT_DELETE: 'event/delete',
  EVENT_RESET: 'event/reset',

  PHETS_PHET: 'interaction/phet',

  MESSAGE_SENT: 'chat/sent',
}
