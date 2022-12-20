import Actions from '@actions';
import ActionTypes from '@constants';
import { ERouterPath, IRPCParams } from '@models';
import { multiplyUploadImage } from '@helper';
import i18n from '@i18n';
import { sendToFigma } from './rpc';

export default function (params: IRPCParams, dispatch: Function) {
  const { type, payload } = params;

  try {
    switch (type) {
      case ActionTypes.common.message:
        dispatch(Actions.message(payload));
        break;
      case ActionTypes.common.route:
        dispatch(Actions.changeRouter(payload));
        break;
      case ActionTypes.rpc.changeProgress:
        dispatch(Actions.changeExportProgress(payload));
        break;
      case ActionTypes.rpc.check.done:
        if (payload <= 0) {
          return dispatch(Actions.message(i18n('common.emptyLayer')));
        }
        dispatch(Actions.changeExportProgress({ progress: 0.05, total: payload, finished: 0 }));
        dispatch(Actions.changeRouter(ERouterPath.Upload));
        sendToFigma({
          type: ActionTypes.rpc.getExportLayers.request,
        });
        break;
      case ActionTypes.rpc.getExportLayers.done:
        multiplyUploadImage(payload, dispatch);
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  }
}
