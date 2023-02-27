import { post } from './request';
import { IExportLayerData, IBasePayload } from '@models';

export function uploadImage(
  name: string,
  data: Uint8Array,
  format = 'png',
  projectName: string,
  total: number,
): Promise<IExportLayerData> {
  return post('https://wobuzyy.cn/compress', {
    name: name.replace(/\//g, '_'),
    file: Buffer.from(data),
    format: format.toLocaleLowerCase(),
    projectName,
    total,
  });
}

export function recordUserInfo(userInfo: User): Promise<IBasePayload<null>> {
  return post('https://wobuzyy.cn/user', userInfo);
}
