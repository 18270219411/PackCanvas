const _ActionType = Symbol('ActionType');

interface _AsyncActionType {
  [key: string]: _ActionType;
}

interface Config {
  [key: string]: string | _ActionType | _AsyncActionType | Config;
}

declare module 'action-types' {
  const ActionType = _ActionType;
  function createActionTypes(cfg: Config): any;
}
