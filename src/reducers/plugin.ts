import ActionTypes from '@constants';
import { IPluginState } from '@models';

const initState: IPluginState = {
  progress: 0,
  compressData: [],
  fail: null,
  total: 0,
  finished: 0,
  layerName: '',
};

export default (state = initState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.rpc.changeProgress:
      const { progress = 0, total = 0, finished = 0, layerName = '' } = payload;
      return {
        ...state,
        progress,
        total,
        finished,
        layerName,
      };
    case ActionTypes.rpc.changeCompressData:
      const { layerData, failReason } = payload;
      return {
        ...state,
        fail: failReason,
        compressData: layerData,
      };
    default:
      return state;
  }
};
