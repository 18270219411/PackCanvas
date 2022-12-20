import { FC, useEffect } from 'react';
import classNames from 'classnames';

import { EMessageType } from '@models';

import './index.scss';

interface IMessageProps {
  content: string;
  type?: EMessageType;

  onClose(): void;
}

const Message: FC<IMessageProps> = (props: IMessageProps) => {
  let timer: number;
  const { content, type, onClose } = props;
  const isWarning = type === EMessageType.Warning;
  const isInformation = type === EMessageType.Information;

  useEffect(() => {
    timer && window.clearTimeout(timer);
    if (!content) {
      return;
    }
    timer = window.setTimeout(() => {
      onClose();
    }, 2e3);
    return () => {
      timer && clearTimeout(timer);
    };
  }, [content]);

  return (
    <div
      className={classNames('s-message-box', {
        warning: isWarning,
        information: isInformation,
      })}
    >
      <p>{content}</p>
    </div>
  );
};

export default Message;
