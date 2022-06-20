import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routers/Root';
import { store } from 'src/redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);

