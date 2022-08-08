import Head from 'next/head'
import Layout from '../components/layout'
// Firebase
import firebase from "firebase"
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth"
// Styles
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Glide from '@glidejs/glide'

const Home = () => {

  useEffect(() => {
    const options = {
      type: "carousel",
      perView: 1,
      breakPoints: {
        700: {
          perView: 1,
        },
      },
      peek: 70
    };
    new Glide(".glide", options).mount();

  }, [])

  return (
    <>
      <Head>
        <title>App | Inicio</title>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="home">
          <h1>¡Hola! <span>Bienvenido a Amapolas</span></h1>
          <div className="options">
            <div className="btn_opt">
              <img src="/assets/icons/Icono_corte.png" alt="" />
              <span>Cortes</span>
            </div>
            <div className="btn_opt">
              <img src="/assets/icons/Icono_manicura.png" alt="" />
              <span>Manicura</span>
            </div>
            <div className="btn_opt">
              <img src="/assets/icons/Icono_manicura.png" alt="" />
              <span>Maquillaje</span>
            </div>
            <div className="btn_opt">
              <img src="/assets/icons/Icono_tratamiento.png" alt="" />
              <span>Tratamientos</span>
            </div>
            <div className="btn_opt">
              <img src="/assets/icons/Icono_estilizado.png" alt="" />
              <span>Estilizado</span>
            </div>
          </div>
          <h2>Especialistas</h2>
          <div className="glide specialists" id="options-peek">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                <li className="glide__slide">
                <img src="/assets/img/sp_estilizado.png" />
                </li>
                <li className="glide__slide">
                <img src="/assets/img/sp_corte.png" />
                </li>
                <li className="glide__slide">
                <img src="/assets/img/sp_maquillaje.png" />
                </li>
                <li className="glide__slide">
                <img src="/assets/img/sp_mani.png" />
                </li>
                <li className="glide__slide">
                <img src="/assets/img/sp_tratamiento.png" />
                </li>
              </ul>
            </div>
          </div>
          <button className="home_btn">
            ¡Quiero agendar!
          </button>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})((): any => {
  return {
    props: {},
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Home)