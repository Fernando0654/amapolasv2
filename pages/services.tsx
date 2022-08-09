import Head from "next/head"
// Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
// Styles
import { AiOutlineGooglePlus } from "react-icons/ai";
// Redux
import { useDispatch } from "react-redux";
import { saveUser } from "../store/actions/user";
import { useState } from "react";
// HTTP
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import Layout from "../components/layout";
import { BsChevronLeft } from "react-icons/bs";

const Services = () => {
    const [PriceIndex, setPriceIndex] = useState(null);
    const preciosRango = ["250-500", "500-1000", "1000-1500", "1500-2000"];

    return (
        <>
            <Head>
                <title>Amapola | Inicio de Sesión</title>
            </Head>
            <Layout>
                <div className="servicios">
                    <img src="/assets/img/sr_banner.png" alt="" />
                    
                    <div className="go_back">
                        <BsChevronLeft />
                        <Link href="/home"><span>Servicios</span></Link>
                        
                    </div>
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
                            <img src="/assets/icons/Icono_maquillaje.png" alt="" />
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
                    <div className="precios_list">
                        <h1 className={PriceIndex === null ? "active" : null}>Precios aproximados</h1>
                        <span className={PriceIndex === 0 ? "active" : null} onClick={() => setPriceIndex(0)}>$250.00 - $500.00</span>
                        <span className={PriceIndex === 1 ? "active" : null} onClick={() => setPriceIndex(1)}>$500.00 - $1000.00</span>
                        <span className={PriceIndex === 2 ? "active" : null} onClick={() => setPriceIndex(2)}>$1000.00 - $1500.00</span>
                        <span className={PriceIndex === 3 ? "active" : null} onClick={() => setPriceIndex(3)}>$1500.00 - $2000.00</span>
                    </div>
                        {PriceIndex === null 
                        ? <button disabled>Continuar</button> 
                        : <Link href="details">
                            <button>Continuar</button>
                        </Link>
                        }
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
})(Services)