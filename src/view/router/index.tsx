import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState, ERouterPath } from '@models';

import Init from '../init';
import Home from '../home';
import Upload from '../upload';

const Router: FC = () => {
  const { page } = useSelector((state: RootState) => state.router);

  switch (page) {
    case ERouterPath.Init:
      return <Init />;
    case ERouterPath.Home:
      return <Home />;
    case ERouterPath.Upload:
      return <Upload />;
    default:
      return <div>loading...</div>;
  }
};

export default Router;
