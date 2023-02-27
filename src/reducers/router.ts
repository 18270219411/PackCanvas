import ActionTypes from '@constants';
import { IRouteState, ERouterPath } from '@models';

const initState: IRouteState = {
  page: ERouterPath.Init,
};

export default (state = initState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.common.route:
      return {
        ...state,
        page: payload,
      };
    default:
      return state;
  }
};
