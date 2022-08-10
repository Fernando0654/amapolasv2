import type { AppProps } from 'next/app'
// REDUX
import { Provider } from "react-redux"
import { createWrapper } from "next-redux-wrapper"
import store from '../store/store'
// Firebase
import initAuth from '../initAuth'
// Styles
import "../styles/globals.scss"
import "@glidejs/glide/src/assets/sass/glide.core.scss";
// Optional Theme Stylesheet
import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import 'react-toastify/dist/ReactToastify.css';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

const makestore = () => store;
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp);

