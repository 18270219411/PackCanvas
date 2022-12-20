import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@models';
import Actions from '@actions';
import { registerListenMessageFromFigma } from '@figma/rpc';

import Router from '../router';
import Message from '@components/message';

import './index.scss';

interface IMainProps {
  message: string | null;

  dismissMessage(): void;
  registerListenMessageFromFigma(): void;
}

class Main extends Component<IMainProps> {
  componentDidMount() {
    const { registerListenMessageFromFigma } = this.props;
    if (!CONFIGS.isWeb) {
      registerListenMessageFromFigma();
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (CONFIGS.isDebug) {
      console.log(error);
      console.log(info);
    }
  }

  renderMessage = () => {
    const { message, dismissMessage } = this.props;
    if (!message) {
      return null;
    }

    return <Message content={message} onClose={dismissMessage} />;
  };

  render() {
    return (
      <div className='s-main'>
        <Router />
        {this.renderMessage()}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { message } = state.common;

  return {
    message,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    registerListenMessageFromFigma: () => {
      registerListenMessageFromFigma(dispatch);
    },
    dismissMessage: () => {
      dispatch(Actions.dismissMessage());
    },
  };
};

const ConnectCom = connect(mapStateToProps, mapDispatchToProps)(Main);

export default ConnectCom;
