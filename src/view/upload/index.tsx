import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import i18n from '@i18n';
import ActionTypes from '@constants';
import { getDispatcher } from '@actions';
import { sendToFigma } from '@figma/rpc';
import { ERouterPath, RootState } from '@models';
import { onCancelTask, downloadCompressImageZip } from '@helper';

import './index.scss';

const CNQuotes = [
  '提出一个问题，往往比解决一个问题更重要。',
  '沉舟侧畔千帆过，病树前头万木春。',
  '纸上得来终觉浅，绝知此事要躬行。',
  '真正的大师永远怀揣着一颗学徒的心。',
  '我曾踏足山巅，也曾进入低谷，二者都使我受益良多。',
  '书到用时方恨少，事非经过不知难。',
  '尽信书不如无书。',
  '贵有恒何必三更眠五更起，最无益只怕一日曝十日寒。',
  '小孩是经过跌倒再跌倒，才逐渐长大的。',
  '与其皱着眉头送人一件贵重礼品，不如面带笑容送人一件小礼物。',
  '我从多话的人学到静默，从偏狭的人学到了宽容，从这残忍的人学到了仁爱，但奇怪的是我对于这些老师并不感激。',
  '敏而好学，不耻下问。',
];

const ENQuotes = [
  'The first step is as good as half over.',
  'No matter how many mistakes you make or how slow you progress，you are still way ahead of everyone who isn’t trying.',
  'They who cannot do as they would，must do as they can.',
  'It’s great to be great，but it’s greater to be human.',
  'I hope you always find a reason to smile.',
  'The best preparation for tomorrow is doing your best today.',
  'Life isn’t about waiting for the storm to pass, it’s about learning to dance in the rain.',
  'Youth is to prepare the material, want to build a bridge to the moon, or on the ground and two palaces or temples. Middle age, finally decided to put up a shed.',
  'It is difficult to say what is impossible, for the dream of yesterday, today is the hope, but also can become tomorrows reality.',
  'In order to be irreplaceable one must always be different.',
  'Three things in life when gone never come back: time, opportunity, and words.',
  'From small beginnings comes great things.',
];

const Upload: FC = () => {
  const dispatch = useDispatch();
  const dispatcher = getDispatcher(dispatch);
  const { progress, compressData, fail, total, finished, layerName } = useSelector((state: RootState) => state.plugin);
  const Quotes = window.language === 'CN' ? CNQuotes : ENQuotes;

  const [quote, setQuote] = useState(Quotes[0]);

  useEffect(() => {
    const index = Math.floor(Math.random() * 10);
    setQuote(Quotes[index]);
  }, []);

  const onCancel = () => {
    dispatcher.changeRouter(ERouterPath.Home);
    if (progress > 0.7) {
      onCancelTask();
    } else {
      sendToFigma({
        type: ActionTypes.rpc.cancel,
      });
    }
  };

  const onComplete = () => {
    if (CONFIGS.isDebug) {
      dispatcher.changeRouter(ERouterPath.Home);
    } else {
      sendToFigma({
        type: 'close',
      });
    }
  };

  return (
    <div className='s-upload'>
      <div className='upload-content'>
        {/* 整体进度展示 */}
        {progress < 1 ? (
          <>
            <div className='progress-wrap'>
              <div className='progress-value' style={{ width: `${progress * 100}%` }} />
            </div>
            {layerName && <div className='layer-name'>{layerName}</div>}
            <div
              className={classnames('progress-proportion', {
                hidden: total <= 0,
              })}
            >
              {finished} / {total}
            </div>
            <div
              className={classnames('progress-text', {
                export: progress <= 0.7,
                compress: progress > 0.7,
              })}
            >
              {(progress * 100).toFixed(2)}%
            </div>
          </>
        ) : (
          <div className='success' />
        )}
        
        {/* 导出切图中 */}
        {progress <= 0.7 && <div className='tip'>{i18n('upload.exportSliceTip')}</div>}
        {/* 压缩切图中 */}
        {progress > 0.7 && progress < 1 && <div className='tip'>{i18n('upload.compressSliceTip')}</div>}
        {/* 导出压缩中 */}
        {progress < 1 && (
          <>
            <div className='cancel' onClick={onCancel}>
              {i18n('common.cancel')}
            </div>
            <div className='quote'>{quote}</div>
          </>
        )}

        {/* 上传压缩完成 */}
        {progress >= 1 && (
          <>
            <div className='tip'>{i18n('upload.complete')}</div>
            <div className='result-info'>{i18n('upload.exportInfo', compressData.length, fail?.length || 0)}</div>
            <div className='download' onClick={() => downloadCompressImageZip(compressData)}>
              {i18n('upload.download')}
            </div>
            <div className='complete' onClick={onComplete}>
              {i18n('upload.success')}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
