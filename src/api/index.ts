import { post } from './request';
import { IExportLayerData } from '@models';

export function uploadImage(
  name: string,
  data: Uint8Array,
  format = 'png',
  projectName: string,
  total: number,
): Promise<IExportLayerData> {
  return post('http://127.0.0.1:20002/compress', {
    name: name.replace(/\//g, '_'),
    file: Buffer.from(data),
    format: format.toLocaleLowerCase(),
    projectName,
    total,
  });
}
