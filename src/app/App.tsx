import React from 'react';
import ReactDOM from 'react-dom/client';

import { ASSETS_EXAMPLE_PROPS } from 'src/assets/asset.constants';

import { Caroumesh } from '../components';

import './app.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="caroumesh-app">
      <Caroumesh {...ASSETS_EXAMPLE_PROPS} />
    </div>
  </React.StrictMode>,
);
