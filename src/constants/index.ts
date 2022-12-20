import { ActionType, createActionTypes } from 'action-types';

const CommonAsyncAction = {
  request: ActionType,
  error: ActionType,
  done: ActionType,
};

const ActionTypes = createActionTypes({
  rpc: {
    cancel: ActionType,
    changeProgress: ActionType,
    changeCompressData: ActionType,
    check: CommonAsyncAction,
    getExportLayers: CommonAsyncAction,
  },
  common: {
    init: ActionType,
    route: ActionType,
    error: ActionType,
    message: ActionType,
    getCacheData: CommonAsyncAction,
    setCacheData: CommonAsyncAction,
    dismissMessage: ActionType,
    checkPluginUpdate: CommonAsyncAction,
  },
});

export default ActionTypes;
