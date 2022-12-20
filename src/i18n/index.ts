import { each, isUndefined } from 'lodash';

import enLang from './locales/en_US';
import zhLang from './locales/zh_CN';

// 语言显示
export const Languages = {
  CN: 'CN',
  US: 'US',
};

interface ILanguages {
  [key: string]: string | ILanguages;
}

const languages: {
  [index: string]: ILanguages;
} = {
  [Languages.CN]: zhLang,
  [Languages.US]: enLang,
};

export default (key: string, ...args: any[]): string => {
  if (!window.language) {
    window.language = Languages.US;
  }
  // 获取语言环境
  //1 打包繁体的设置
  const currLang = languages[window.language];

  let value: any;
  let paths = key.split('.');

  each(paths, (path) => {
    if (isUndefined(value)) {
      value = currLang[path];
    } else {
      value = value[path];
    }
  });

  if (isUndefined(value)) {
    console.log(`i18n错误：${key}找不到`);
    return '';
  }

  // 替换{1}
  value = value.replace(/{(\d+)}/g, (match: string, index: number) => {
    if (isUndefined(args[index])) {
      return match;
    }
    return args[index];
  });

  return value;
};
