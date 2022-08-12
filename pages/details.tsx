import Head from "next/head"
// Firebase
import 'firebase/auth'
import { AuthAction, useAuthUser, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
// HTTP
import Link from "next/link";
import Layout from "../components/layout";
import { BsChevronLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { saveCitaR } from "../store/actions/cita";
import { MdOutlineDone } from "react-icons/md"

const Services = () => {
    const preciosRango = ["250-500", "500-1000", "1000-1500", "1500-2000"];
    const serviciosImg = ["bn_corte.png", "bn_mani.png", "bn_maquillaje.png", "bn_tratamiento.png", "bn_estilizado.png"];
    const serviciosName = ["Cortes", "Manicura y/o Pedicura", "Maquillaje", "Tratamientos", "Estilizado"];
    const especialista = ["sp_corte.png", "sp_mani.png", "sp_maquillaje.png", "sp_tratamiento.png", "sp_estilizado.png"]
    const especialistaName = ["Kim Garduño", "Alejandra Íñiguez", "Valeria Muñoz", "Manuel Oliva", "Silvia Galván"]

    const precio = useSelector((state: any) => state.precio);
    const servicio = useSelector((state: any) => state.servicio);

    const Router = useRouter();
    const dispatch = useDispatch();
    const user = useAuthUser();

    const [Agendando, setAgendando] = useState(false);
    const [Success, setSuccess] = useState(false);

    let Cita = {
        cliente: null,
        servicio: null,
        precio: null,
        fecha: null,
        hora: null,
        especialista: null
    }

    useEffect(() => {
        if (precio === null || servicio === null) {
            Router.push("/services")
        }
    }, [])

    const saveCita = () => {
        Cita = {
            ...Cita,
            cliente: user.email,
            servicio: serviciosName[servicio],
            precio: preciosRango[precio],
            especialista: especialistaName[servicio]
        }
        if (Cita.cliente === null ||
            Cita.servicio === null ||
            Cita.precio === null ||
            Cita.fecha === null ||
            (Cita.hora === null || Cita.hora === 'default')) {
            toast.error("Coloca una fecha y un horario adecuados")
            return
        }
        loadingBar();
        dispatch(saveCitaR(Cita));
        setAgendando(true);
    }

    const loadingBar = () => {
        setAgendando(true);
        var elem = document.getElementById("myBar");
        var width = 0;
        var id = setInterval(frame, 15);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                setAgendando(false);
                setSuccess(true);
            } else {
                width++;
                elem.style.width = width + '%';
                document.getElementById("textbar").innerHTML = 'Agendando... ' + width * 1 + '%';
            }
        }
    }

    const getCurrentDate = () => {
        const date = new Date();
        let mes: any = date.getMonth() + 1;
        let dia: any = date.getDate();
        let ano: any = date.getFullYear();
        if (dia < 10) dia = '0' + dia;
        if (mes < 10) mes = '0' + mes
        console.log("dfsafsd")
        return ano + "-" + mes + "-" + dia
    }

    return (
        <>
            <Head>
                <title>Amapola | Detalles del servicio</title>
            </Head>
            <Layout>
                <div className="agendado_success" style={!Agendando && Success ? { display: "flex" } : { display: "none" }}>
                    <div className="success_icon">
                        <MdOutlineDone />
                    </div>
                    <h2>Agendado correctamente</h2>
                    <p>Gracias por confiar en Amapolas</p>
                    <button onClick={() => Router.push("/agenda")}>Finalizar</button>
                </div>
                <div className="screen_agendando" style={Agendando ? { display: "flex" } : { display: "none" }}>
                    <div className="agendando">
                        <div id="myBar" className="bar gray" style={{ width: "0%" }}></div>
                    </div>
                    <p id="textbar">Agendando... 0%</p>
                </div>
                <div className="detalles">
                    <div className="title_back">
                        <Link href="/services"><button className="no_btn"><BsChevronLeft /></button></Link>
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
                            <input type="date" name="date" onChange={(e) => Cita = { ...Cita, fecha: e.target.value }} defaultValue={getCurrentDate()} />
                        </div>
                        <div className="date_da">
                            <span>Hora</span>
                            <select name="hrs" onChange={(e) => Cita = { ...Cita, hora: e.target.value }}>
                                <option value="default">Selecciona horario</option>
                                <option value="10am">10:00am</option>
                                <option value="12pm">12:00pm</option>
                                <option value="14pm">2:00pm</option>
                                <option value="16pm">4:00pm</option>
                            </select>
                        </div>
                    </div>
                    <div className="specialist">
                        <img src={"/assets/img/" + especialista[servicio]} alt="" />
                    </div>
                    <button onClick={() => saveCita()}>Continuar</button>
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