import { init } from './rpc';

const options = {
  height: 416,
  width: 280,
};

figma.showUI(__html__, options);

init();

console.log(figma);
