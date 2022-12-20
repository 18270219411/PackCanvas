import { FC } from 'react';
import { useDispatch } from 'react-redux';

import i18n from '@i18n';
import { ERouterPath } from '@models';
import { getDispatcher } from '@actions';
import { sendToFigma } from '@figma/rpc';

import Logo from '@components/logo';

import './index.scss';

const Init: FC = () => {
  const dispatch = useDispatch();
  const dispatcher = getDispatcher(dispatch);

  const onStart = (lang = 'CN') => {
    window.language = lang;
    dispatcher.changeRouter(ERouterPath.Home);
  };

  return (
    <div className='s-init'>
      <Logo />
      <div className='cn btn' onClick={() => onStart()}>
        {i18n('init.startWithCn')}
      </div>
      <div className='en btn' onClick={() => onStart('US')}>
        {i18n('init.startWithEn')}
      </div>
      <div
        className='exit btn'
        onClick={() => {
          if (!CONFIGS.isWeb) {
            sendToFigma({
              type: 'close',
            });
          }
        }}
      >
        {i18n('init.exit')}
      </div>
    </div>
  );
};

export default Init;
