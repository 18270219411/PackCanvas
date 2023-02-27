import { Dispatch } from 'redux';

import ActionTypes from '@constants';
import { ERouterPath, EUploadType, IExportLayerData } from '@models';
import { sendToFigma } from '@figma/rpc';

export interface IDispatcher {
  changeRouter(router: ERouterPath): void;
  onExport(uploadType: EUploadType): void;
  getUserInfo(): void;
}

export const getDispatcher = (dispatch: Dispatch): IDispatcher => ({
  changeRouter: (router: ERouterPath) => {
    dispatch({
      type: ActionTypes.common.route,
      payload: router,
    });
  },
  onExport: (uploadType: EUploadType) => {
    sendToFigma({
      type: ActionTypes.rpc.check.request,
      payload: uploadType,
    });
  },
  getUserInfo: () => {
    sendToFigma({
      type: ActionTypes.rpc.getUserInfo.request,
    });
  },
});

export default {
  changeExportProgress:
    (data: { progress: number; total: number; finished: number; layerName?: string }) => (dispatch: Function) => {
      dispatch({
        type: ActionTypes.rpc.changeProgress,
        payload: data,
      });
    },
  message: (message: string) => (dispatch: Function) => {
    dispatch({
      type: ActionTypes.common.message,
      payload: message,
    });
  },
  dismissMessage: () => (dispatch: Function) => {
    dispatch({
      type: ActionTypes.common.dismissMessage,
    });
  },
  changeRouter: (router: ERouterPath) => (dispatch: Function) => {
    dispatch({
      type: ActionTypes.common.route,
      payload: router,
    });
  },
  changeCompressData: (data: { layerData: IExportLayerData[]; failReason: Error[] | null }) => (dispatch: Function) => {
    dispatch({
      type: ActionTypes.rpc.changeCompressData,
      payload: data,
    });
  },
};
