// Frontened_App/src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Alert from './components/Alert/index';
import Loading from './components/Loader/Loading';
import AuthNavigation from './navigation/AuthNavigation';

// Your app navigator or main component

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthNavigation />
        <Alert />
        <Loading />
      </PersistGate>
    </Provider>
  );
};

export default App;