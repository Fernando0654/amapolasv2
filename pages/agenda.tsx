import Head from "next/head"
// Firebase
import 'firebase/auth'
import { AuthAction, useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
// HTTP
import Link from "next/link";
import Layout from "../components/layout";
import { BsChevronLeft } from "react-icons/bs";
import { Agendadas } from "../components/agendadas";
import { useEffect, useState } from "react";
import Glide from '@glidejs/glide'
import axios from "axios";
import { Canceladas } from "../components/canceladas";
import { Exitosas } from "../components/exitosas";
import { useDispatch, useSelector } from "react-redux";
import { saveCitas } from "../store/actions/cita";
import Menu from "../components/menu";

const Agenda = () => {
    const [_Agendadas, setAgendadas] = useState([]);
    const [_Exitosas, setExitosas] = useState([]);
    const [_Canceladas, setCanceladas] = useState([]);

    const [Loading, setLoading] = useState(true);

    const user = useAuthUser();
    const dispatch = useDispatch();

    useEffect(() => {
        getCitasCliente(user.email)
        const options = {
            type: "slider",
            perView: 1,
            breakPoints: {
                700: {
                    perView: 1,
                },
            }
        };
        new Glide(".glide", options).mount();
    }, []);

    useEffect(() => {
    }, [_Agendadas, _Exitosas, _Canceladas])


    const getCitasCliente = async (email: string) => {
        await axios(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/citas/${email}`)
            .then((res) => {
                setStatusState(res.data.data)
                dispatch(saveCitas(res.data.data))
                setLoading(false);
            })
    }

    const setStatusState = (data) => {
        let pendientes = [];
        let exitosas = [];
        let canceladas = [];
        data.map((cita: any, index: number) => {
            if (cita.status === "pendiente") {
                pendientes.push(data[index]);
            }
            if (cita.status === "exitosa") {
                exitosas.push(data[index]);
            }
            if (cita.status === "cancelada") {
                canceladas.push(data[index]);
            }
        })
        console.log(exitosas)
        setAgendadas(pendientes);
        setExitosas(exitosas);
        setCanceladas(canceladas);

    }

    const updateAgendadas = (data) => setAgendadas(data);

    const updateExitosas = (data) => setExitosas([..._Exitosas, data[0]]);

    const updateCanceladas = (data) => setCanceladas([..._Canceladas, data[0]])

    return (
        <>
            <Head>
                <title>Amapola | Agenda</title>
            </Head>
            <Layout>
                <div className="agenda">
                    <div className="title_back">
                        <Link href="/home"><button className="no_btn"><BsChevronLeft /></button></Link>
                        <Link href="/home"><span>Tus citas</span></Link>
                    </div>
                    <div className="glide specialists">
                        <div className="glide__track" data-glide-el="track">
                            <ul className="glide__slides">
                                <>
                                    <li className="glide__slide">
                                        <Agendadas
                                            loading={Loading}
                                            citas={_Agendadas}
                                            updateAgendadas={updateAgendadas}
                                            updateExitosas={updateExitosas}
                                            updateCanceladas={updateCanceladas} />
                                    </li>
                                    <li className="glide__slide">
                                        <Exitosas citas={_Exitosas} />
                                    </li>
                                    <li className="glide__slide">
                                        <Canceladas citas={_Canceladas} />
                                    </li>
                                </>
                            </ul>
                            <div className="glide__bullets header_nav" data-glide-el="controls[nav]">
                                <button className="glide__bullet" data-glide-dir="=0">Agendadas</button>
                                <button className="glide__bullet" data-glide-dir="=1">Exitosas</button>
                                <button className="glide__bullet" data-glide-dir="=2">Canceladas</button>
                            </div>
                        </div>
                    </div>
                    <Menu />
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
})(Agenda)
