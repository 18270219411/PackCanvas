import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { throttle } from 'lodash';

import i18n from '@i18n';
import { ERouterPath, EUploadType } from '@models';
import { getDispatcher } from '@actions';

import Logo from '@components/logo';

import './index.scss';

const Home: FC = () => {
  const dispatch = useDispatch();
  const dispatcher = getDispatcher(dispatch);

  useEffect(() => dispatcher.getUserInfo(), []);

  const getSelectedNodeSlice = () => {
    if (!CONFIGS.isWeb) {
      dispatcher.onExport(EUploadType.SelectedNode);
    }
  };

  const getSelectedFrameSlice = () => {
    if (!CONFIGS.isWeb) {
      dispatcher.onExport(EUploadType.SelectedFrame);
    }
  };

  const getSelectedPageSlice = () => {
    if (!CONFIGS.isWeb) {
      dispatcher.onExport(EUploadType.SelectedPage);
    }
  };

  const getAllPageSlice = () => {
    if (!CONFIGS.isWeb) {
      dispatcher.onExport(EUploadType.AllPages);
    }
  };

  return (
    <div className='s-home'>
      <Logo />
      <div className='s-button b1' onClick={throttle(getSelectedNodeSlice, 100)}>
        {i18n('home.getSelectedNodeSlice')}
      </div>
      <div className='s-button b2' onClick={throttle(getSelectedFrameSlice, 100)}>
        {i18n('home.getSelectedFrameSlice')}
      </div>
      <div className='s-button b3' onClick={throttle(getSelectedPageSlice, 100)}>
        {i18n('home.getSelectedPageSlice')}
      </div>
      <div className='s-button b4' onClick={throttle(getAllPageSlice, 100)}>
        {i18n('home.getAllPageSlice')}
      </div>
      {/* <div className='footer'>
        <div className='setting' onClick={() => dispatcher.changeRouter(ERouterPath.Settings)}>
          <img src='https://18270219411.github.io/assets/auto-compress-export/icon_setting.png' />
          <span>{i18n('home.setting')}</span>
        </div>
      </div> */}
      {/* <div className='copyright'>
        <a href='https://beian.miit.gov.cn/' target='_blank'>
          蜀ICP备2022030822号-1
        </a>
      </div> */}
    </div>
  );
};

export default Home;
