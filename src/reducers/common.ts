import ActionTypes from '@constants';
import { ICommonState } from '@models';

const initState: ICommonState = {
  message: '',
};

export default (state = initState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.common.message:
      return {
        message: payload,
      };
    case ActionTypes.common.dismissMessage:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
