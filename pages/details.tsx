import Head from "next/head"
// Firebase
import 'firebase/auth'
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
// HTTP
import Link from "next/link";
import Layout from "../components/layout";
import { BsChevronLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getService } from "../store/actions/servicio";
import { useRouter } from "next/router";

const Services = () => {
    const preciosRango = ["250-500", "500-1000", "1000-1500", "1500-2000"];
    const serviciosImg = ["bn_corte.png", "bn_mani.png", "bn_maquillaje.png", "bn_tratamiento.png", "bn_estilizado.png"];
    const serviciosName = ["Cortes", "Manicura y/o Pedicura", "Maquillaje", "Tratamientos", "Estilizado"]
    const precio = useSelector((state: any) => state.precio);
    const servicio = useSelector((state: any) => state.servicio);

    const Router = useRouter();

    useEffect(() => {
        if (precio === null || servicio === null) {
            Router.push("/services")
        }
        console.log("servicio: ", servicio)
    }, [])

    return (
        <>
            <Head>
                <title>Amapola | Detalles del servicio</title>
            </Head>
            <Layout>
                <div className="detalles">
                    <div className="title_back">
                        <BsChevronLeft />
                        <Link href="/services"><span>Detalles del servicio</span></Link>
                    </div>
                    <img src={"/assets/img/" + serviciosImg[servicio]} alt="" />
                    <div className="badge_pink">
                        {
                            preciosRango[precio]
                                ? <p>{serviciosName[servicio]}
                                    <span>${preciosRango[precio].split("-")[0] + ".00-$" + preciosRango[precio].split("-")[1] + ".00"}</span>
                                </p> : () => Router.push("/services")
                        }
                    </div>
                    <div className="date_form">
                        <p>Selecciona la fecha y hora</p>
                        <div className="date_da">
                            <span>Fecha</span>
                            <input type="date" name="date" />
                        </div>
                        <div className="date_da">
                            <span>Hora</span>
                            <select name="hrs">
                                <option value="10">10:00am</option>
                                <option value="12">12:00pm</option>
                                <option value="14">2:00pm</option>
                                <option value="16">4:00pm</option>
                            </select>
                        </div>
                    </div>
                    <div className="specialist">
                        <img src="sp_corte.png" alt="" />
                    </div>
                    <button>Continuar</button>
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