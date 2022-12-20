export {};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    language: string;
  }

  let CONFIGS: {
    isDebug: boolean;
    isWeb: boolean;
  };
}
