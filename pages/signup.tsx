import Head from "next/head"
// Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
// Styles
import { AiOutlineGooglePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { saveUser } from "../store/actions/user";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/layout";
const SignUp = () => {
    const dispatch = useDispatch();
    const [Carga, setCarga] = useState(null);
    const Router = useRouter();

    const registerWithGoogle = () => {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res) => {
                dispatch(saveUser({
                    name: res.user.displayName,
                    descr: "No description yet",
                    img: res.user.photoURL,
                    isNew: res.additionalUserInfo.isNewUser,
                    email: res.user.email
                }));
                if (res.additionalUserInfo.isNewUser) {
                    axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/` + res.user.email, {
                        nombre: res.user.displayName,
                        correo: res.user.email,
                        password: null,
                        phone: res.user.phoneNumber === null ? "000" : res.user.phoneNumber,
                        img: res.user.photoURL,
                        API: true
                    })
                        .then((res) => {
                            toast.info("Registrado exitosamente");
                        });
                }
            });
    }

    const registerWithUserAndPassword = async (e) => {
        e.preventDefault();
        Carga.correo = Carga.correo.trim();
        if (Carga.password !== Carga.password2) {
            toast.error("Las contrase??as no coinciden");
            console.log("passwords")
            return;
        }
        axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/` + Carga.correo, Carga)
            .then(() => {
                Router.push("/auth");
            }).catch((res) => {
                toast.error(res.response.data.message)
            })

    }

    const handleChange = (e) => {
        setCarga({
            ...Carga,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <Head>
                <title>Amapolas | Registro</title>
            </Head>
            <Layout>
            <div className="login_container signup">
                <form className="container" onSubmit={(e) => registerWithUserAndPassword(e)}>
                    <h1>Crea una cuenta</h1>
                    <br />
                    <input type="email" name="correo" placeholder="Correo *" onChange={(e) => handleChange(e)} required />
                    <input type="password" name="password" placeholder="Contrase??a *" onChange={(e) => handleChange(e)} required />
                    <input type="password" name="password2" placeholder="Repetir contrase??a *" onChange={(e) => handleChange(e)} required />
                    <input type="number" name="phone" placeholder="N??mero de tel??fono *" onChange={(e) => handleChange(e)} required />
                    <p>
                        Si creas una cuenta en nuestra aplicaci??n estar??s aceptando <a href="#">T??rminos y condiciones</a> y <a href="#">Pol??tica de privacidad</a>
                    </p>
                    <button type="submit">Crear cuenta</button>
                    <p>??Ya tienes una cuenta? <Link href="/auth"><a style={{ color: "#6f70ff", textDecoration: "none", fontWeight: "bold" }}>Inicia sesi??n</a></Link></p>
                    <span>??</span>
                    <button className="btn_pink" onClick={() => registerWithGoogle()}>
                        <img src="/g_icon.png" alt="" />
                        Continuar con Google
                    </button>
                </form>
            </div>
            </Layout>
        </>
    )
}

export const getServerSideProps = withAuthUserTokenSSR({
    appPageURL: "/home",
})(({ req, res }): any => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    return {
        props: {}
    }
})

export default withAuthUser({
    appPageURL: "/home",
    whenAuthed: AuthAction.REDIRECT_TO_APP
})(SignUp)
