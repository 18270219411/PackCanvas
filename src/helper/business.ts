import { uploadImage } from '../api';
import Actions from '@actions';
import { IExportLayerData } from '@models';
import { handleCallbackFunctions } from './common';

export function multiplyUploadImage(data: IExportLayerData[], dispatch: Function) {
  let currentFinishedExport = 0;
  const totalToExport = data.length;

  const start = Date.now();

  console.log('-----------------------');
  console.log('start compress slice...');

  handleCallbackFunctions(
    {
      tasks: data.map((layer) => (cb: Function) => {
        uploadLayerImage(layer, totalToExport)
          .then((data) => {
            currentFinishedExport += 1;
            const progress = parseFloat((0.7 + (currentFinishedExport / totalToExport) * 0.3).toFixed(4));
            dispatch(
              Actions.changeExportProgress({
                progress,
                total: totalToExport,
                finished: currentFinishedExport,
                layerName: layer.name,
              }),
            );
            cb(null, data);
          })
          .catch((e) => {
            currentFinishedExport += 1;
            const progress = parseFloat((0.7 + (currentFinishedExport / totalToExport) * 0.3).toFixed(4));
            dispatch(Actions.changeExportProgress({ progress, total: totalToExport, finished: currentFinishedExport }));
            cb(e);
          });
      }),
      limit: 1,
      failToExit: false,
    },
    (err, data: IExportLayerData[]) => {
      const end = Date.now();

      if (err && err.length) {
        console.log('multiply upload image err is ', err);
      }

      console.log('end compress slice...');
      console.log(`压缩总耗时：${Math.ceil((end - start) / 1000)}s`);

      dispatch(Actions.changeCompressData({ layerData: data.filter((i) => !!i), failReason: err }));
    },
  );
}

async function uploadLayerImage(data: IExportLayerData, total: number): Promise<IExportLayerData> {
  try {
    const { name, buffer, format, projectName } = data;
    return await uploadImage(name, buffer, format, projectName, total);
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export function downloadCompressImageZip(data: IExportLayerData[]) {
  if (!data.length) {
    return;
  }

  if (data.length === 1) {
    const { name, format, buffer } = data[0];
    const blob = new Blob([Buffer.from(buffer)], { type: `image/${format}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.${format}`;
    a.click();
    document.removeChild(a);
    return;
  }

  const JSZip = require('jszip');
  const zip = new JSZip();
  const FileSaver = require('file-saver');

  for (let i = 0; i < data.length; ++i) {
    const layer = data[i];

    if (!layer) {
      return;
    }

    const { name, format, buffer, projectName = 'images' } = layer;

    const folder = zip.folder(projectName);

    if (folder) {
      folder.file(`${name}.${format}`, Buffer.from(buffer));
    }
  }

  zip.generateAsync({ type: 'blob' }).then((content: any) => {
    FileSaver.saveAs(content, 'slice.zip');
  });
}
