import ActionTypes from '@constants';
import { sendToWeb } from '@plugin/rpc';
import { IExportLayerData } from '@models';
import { onStartTask, handleCallbackFunctions } from './common';

const isFrame = (node: any): boolean => node && node.type === 'FRAME';

export const getFrameById = (frameId: string): FrameNode | null => {
  const node = figma.getNodeById(frameId);

  if (isFrame(node)) {
    return node as FrameNode;
  }

  return null;
};

export const getAllPagesFrames = (): FrameNode[] => {
  const result: FrameNode[] = [];
  if (figma.root && figma.root.children.length > 0) {
    figma.root.children.forEach((page) => {
      const pageFrames = getPageFrames(page);
      if (pageFrames.length > 0) {
        result.push(...pageFrames);
      }
    });
  }
  return result;
};

export const getSelectedPageFrame = (): FrameNode[] => {
  return getPageFrames(figma.currentPage);
};

export const getSelectedNode = (): SceneNode[] => {
  const result: SceneNode[] = [];

  figma.currentPage.selection.forEach((node) => result.push(node));

  return result;
};

const getPageFrames = (page: PageNode) => {
  const result: FrameNode[] = [];
  if (page) {
    page.children.forEach((node) => {
      if (isFrame(node) && result.indexOf(node as FrameNode) === -1) {
        result.push(node as FrameNode);
      }
    });
  }

  return result;
};

export const getSelectedFrames = (): FrameNode[] => {
  const result: FrameNode[] = [];
  const { selection } = figma.currentPage;

  if (selection && selection.length > 0) {
    selection.forEach((node) => {
      const frame = getFrameByNode(node);
      if (frame && result.indexOf(frame) === -1) {
        result.push(frame);
      }
    });
  }

  return result;
};

// node 有可能位于 frame 外
const getFrameByNode = (node: any): FrameNode | null => {
  if (isFrame(node)) {
    return node as FrameNode;
  } else if (node.parent) {
    return getFrameByNode(node.parent);
  }

  return null;
};

export const isNodeExported = (node: SceneNode) => {
  return !isFrame(node) && node.exportSettings && node.exportSettings.length > 0;
};

export const getExportLayers = (nodes: any) => {
  const result: any = [];

  nodes.forEach((node: any) => {
    if (node && node.exportSettings && node.exportSettings.length > 0) {
      const { exportSettings, name } = node;
      const len = exportSettings.length;

      for (let i = 0; i < len; ++i) {
        result.push({
          node,
          _name: len > 1 ? `${name}_${i}` : name,
          _exportSettings: exportSettings[i],
        });
      }
    }

    if (node && node.children && node.children.length > 0) {
      const children = getExportLayers(node.children);
      result.push.apply(result, [...children]);
    }
  });

  return result;
};

export function multiplyExportImage(layers: SceneNode[]) {
  onStartTask();
  let currentFinishedExport = 0;
  const totalToExport = layers.length;

  console.log('start export slice...');
  console.log(`export total layer num: ${totalToExport}`);

  // TODO: 免费版 tinypng 单 ip 最大限制 500 张
  // if (totalToExport > 500) {
  //   sendToWeb({
  //     type: ActionTypes.common.route,
  //     payload: ERouterPath.Home,
  //   });

  //   sendToWeb({
  //     type: ActionTypes.common.message,
  //     payload: '抱歉，一次只支持导出 500 张切图',
  //   });

  //   return;
  // }

  handleCallbackFunctions(
    {
      tasks: layers.map((layer) => (cb: Function) => {
        const start = Date.now();
        getLayerExportImage(layer)
          .then((data) => {
            currentFinishedExport += 1;
            const progress = parseFloat((0.05 + (currentFinishedExport / totalToExport) * 0.65).toFixed(4));
            sendToWeb({
              type: ActionTypes.rpc.changeProgress,
              payload: { progress, total: 0, finished: 0 },
            });

            const end = Date.now();
            // @ts-ignore
            console.log(`【${layer._name}】导出成功`, `耗时：${end - start}ms`);

            cb(null, data);
          })
          .catch((err) => {
            currentFinishedExport += 1;
            const progress = parseFloat(((currentFinishedExport / totalToExport) * 0.7).toFixed(4));
            // @ts-ignore
            console.log(`【${layer._name}】导出失败`, `原因：${err.message}`);
            sendToWeb({
              type: ActionTypes.rpc.changeProgress,
              payload: { progress, total: 0, finished: 0 },
            });
            cb(err);
          });
      }),
      limit: 1,
      failToExit: true,
    },
    (err, data) => {
      if (err && err.length > 0) {
        console.log('multiply export image err is ', err);
      }

      console.log('end export slice...');
      console.log('-----------------------');

      sendToWeb({
        type: ActionTypes.rpc.getExportLayers.done,
        payload: data.filter((i) => !!i),
      });
    },
  );
}

async function getLayerExportImage(layer: any): Promise<IExportLayerData> {
  return new Promise((resolve, reject) => {
    try {
      const { node, _exportSettings, _name } = layer;

      setTimeout(() => {
        node
          .exportAsync({ ..._exportSettings })
          .then((buffer: Uint8Array) => {
            resolve({
              buffer,
              name: _name,
              format: _exportSettings.format,
              projectName: figma.root.name,
            });
          })
          .catch((e: Error) => reject(e));
      }, 50);
    } catch (error) {
      return reject(error);
    }
  });
}

export const getUserInfo = () => {
  const user = figma.currentUser;
  if (user) {
    return {
      id: user.id,
      name: user.name,
      avatar: user.photoUrl,
      color: user.color,
      sessionId: user.sessionId,
    };
  }
};
