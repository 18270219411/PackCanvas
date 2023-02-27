// ? --------------- common ---------------

export enum EMessageType {
  Warning = 'warngin',
  Message = 'message',
  Information = 'information',
}

export interface IRPCParams {
  type: string;
  payload?: any;
}

export enum ERouterPath {
  Init = 'init',
  Home = 'home',
  Upload = 'upload',
  Settings = 'settings',
  Update = 'update',
}

export enum EUploadType {
  AllPages = 'allPages',
  SelectedNode = 'selectedNode',
  SelectedPage = 'selectedPage',
  SelectedFrame = 'selectedFrame',
}

export interface IRouteState {
  page: ERouterPath;
}

export interface ICommonState {
  message: string | null;
}

export interface IPluginState {
  progress: number;
  compressData: IExportLayerData[];
  fail: Error[] | null;
  total: number;
  finished: number;
  layerName: string;
}

export type RootState = {
  common: ICommonState;
  router: IRouteState;
  plugin: IPluginState;
};

// ? --------------- common ---------------

// ? --------------- api ---------------
export interface IBasePayload<T> {
  code: number;
  message: string;
  data?: T;
}

export class CustomError extends Error {
  public code: number;
  public errorData: any;

  constructor(message: string, code?: number, public data?: any) {
    super(message);
    this.code = code || 1;
    this.errorData = data || null;
  }
}

// ? --------------- common ---------------

// ? --------------- plugin ---------------

export interface IExportLayerData {
  name: string;
  buffer: Uint8Array;
  format: 'JPG' | 'PNG' | 'SVG' | 'PDF';
  projectName: string;
}

// ? --------------- plugin ---------------
