import Head from 'next/head'
import Layout from '../components/layout'
import Glide from '@glidejs/glide'
// Firebase
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth"
// Styles
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsChevronRight } from "react-icons/bs"
import Link from 'next/link';

const Home = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      type: "carousel",
      perView: 1,
      breakPoints: {
        700: {
          perView: 1,
        },
      },
    };

    new Glide(".glide", options).mount();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
        <div className="splash" style={Loading ? { transform: "translate(-50%, -50%)" } : { transform: "translate(-190%, -50%)" }} >
          <Image src="/splash.gif" width={700} height={700} />
        </div>
        <div className="inicio" style={Loading ? { left: '300%' } : { left: '0%' }}>
          <div className="glide">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                <li className="glide__slide">
                  <h1>Descubre lo que tenemos para ti</h1>
                  <img src="/assets/img/induccion/1.1.png" />
                </li>
                <li className="glide__slide">
                  <h1>Encuentra a tu estilista favorito</h1>
                  <img src="/assets/img/induccion/2.2.png" />
                </li>
                <li className="glide__slide">
                  <h1>¡Cambia tu look hoy!</h1>
                  <img src="/assets/img/induccion/3.3.png" />
                </li>
              </ul>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button className="glide__bullet" data-glide-dir="=0"></button>
              <button className="glide__bullet" data-glide-dir="=1"></button>
              <button className="glide__bullet" data-glide-dir="=2"></button>
            </div>
          </div>
          <Link href="/auth"><a>Muéstrame <BsChevronRight /> </a></Link>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  appPageURL: "/",
    whenAuthed: AuthAction.REDIRECT_TO_APP
})((): any => {
  return {
    props: {},
  }
})

export default withAuthUser({
  appPageURL: "/",
    whenAuthed: AuthAction.REDIRECT_TO_APP
})(Home)
