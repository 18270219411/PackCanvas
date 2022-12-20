import { combineReducers } from 'redux';

import router from './router';
import common from './common';
import plugin from './plugin';

export default combineReducers({
  router,
  common,
  plugin,
});
