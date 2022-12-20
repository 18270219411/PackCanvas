import {
  onCancelTask,
  getAllPagesFrames,
  getExportLayers,
  getSelectedFrames,
  getSelectedPageFrame,
  multiplyExportImage,
} from '@helper';
import { sendToWeb } from './rpc';
import { EUploadType, IRPCParams } from '@models';
import ActionTypes from '@constants';

let layers: SceneNode[] = [];

export default function ({ type, payload }: IRPCParams) {
  try {
    switch (type) {
      case 'close':
        figma.closePlugin();
        break;
      case ActionTypes.rpc.cancel:
        onCancelTask();
        layers = [];
        break;
      case ActionTypes.rpc.check.request:
        switch (payload) {
          case EUploadType.SelectedFrame:
            layers = getExportLayers(getSelectedFrames());
            break;
          case EUploadType.SelectedPage:
            layers = getExportLayers(getSelectedPageFrame());
            break;
          case EUploadType.AllPages:
            layers = getExportLayers(getAllPagesFrames());
            break;
          default:
            break;
        }

        sendToWeb({
          type: ActionTypes.rpc.check.done,
          payload: layers.length,
        });
        break;

      case ActionTypes.rpc.getExportLayers.request:
        multiplyExportImage(layers);
        break;
      default:
        return;
    }
  } catch (e) {
    console.error(e);
  }
}
