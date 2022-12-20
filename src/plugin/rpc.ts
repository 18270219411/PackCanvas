import { IRPCParams } from '@models';
import actionHandler from './actionHandler';

export const sendToWeb = (params: IRPCParams) => {
  figma.ui.postMessage(params);
};

export const init = () => {
  figma.ui.onmessage = (params: IRPCParams) => {
    try {
      actionHandler(params);
    } catch (e) {
      console.error(e);
    }
  };
};
