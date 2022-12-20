import { FC } from 'react';

import './index.scss';

const Logo: FC = () => {
  return (
    <div className='s-logo'>
      <div className='logo-content'>
        <div className='logo-text'>Auto</div>
        <div className='logo-text'>Compress</div>
        <div className='logo-text'>Export</div>
      </div>
    </div>
  );
};

export default Logo;
