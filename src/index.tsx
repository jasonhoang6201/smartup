import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import Root from './routers/Root';
import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Root />
  </Provider>
);

