import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import configureStore from 'src/store';
import 'src/styles/global.scss';
import theme from 'src/themes';
import RouterCustom from './routes';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable-next-line */
function App() {
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode="dark" />
        <React.StrictMode>
          <BrowserRouter>
            <RouterCustom />
            <ToastContainer
              position="top-right"
              hideProgressBar
              pauseOnHover
              closeButton
              toastStyle={{
                position: 'relative',
                overflow: 'visible',
              }}
            />
          </BrowserRouter>
        </React.StrictMode>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
