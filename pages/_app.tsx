import '../styles/globals.css';
import AppContextProvider from './../context/AppContextProvider';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
