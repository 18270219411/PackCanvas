import { IRPCParams } from '@models';
import actionHandler from './actionHandler';

export const sendToFigma = (info: IRPCParams) => {
  const postMessage = parent.postMessage({ pluginMessage: info }, '*');
  // @ts-ignore
  if (postMessage && postMessage.catch) {
    // @ts-ignore
    postMessage.catch((e: Error) => {
      console.log(e);
    });
  }
};

export const registerListenMessageFromFigma = (dispatch: Function) => {
  onmessage = (event) => {
    const { pluginMessage } = event.data;
    try {
      if (pluginMessage) {
        actionHandler(pluginMessage, dispatch);
      }
    } catch (e) {
      console.log(e);
    }
  };
};
