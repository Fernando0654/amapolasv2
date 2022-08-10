import Head from "next/head"
// Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth"
// Redux
import { useDispatch } from "react-redux";
import { saveUser } from "../store/actions/user";
import { useState } from "react";
// HTTP
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const AuthPage = () => {
    const dispatch = useDispatch();
    const [IsNewUser, setIsNewUser] = useState(false);
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);

    const registerWithGoogle = () => {
        // verifyIfItsNewUser(Email);
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res) => {
                dispatch(saveUser({
                    name: res.user.displayName,
                    descr: "No description yet",
                    img: res.user.photoURL,
                    isNew: res.additionalUserInfo.isNewUser,
                    correo: res.user.email
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
                            console.log(res)
                            toast.info("Registrado exitosamente")
                        });
                }
            });
    }

    const registerWithUserAndPassword = () => {
        verifyIfItsNewUser(Email);
    }

    const verifyIfItsNewUser = (email) => {
        axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/` + email)
            .then((res) => {
                console.log(res);
            });
    }

    return (
        <>
            <Head>
                <title>Amapola | Inicio de Sesión</title>
            </Head>
            <div className="login_container">
                <div className="container">
                    <h1>Inicia sesión con tu cuenta</h1>
                    <input type="text" placeholder="Email*" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Contraseña*" onChange={(e) => setPassword(e.target.value)} />
                    <div className="btn_container">
                        <button onClick={() => registerWithUserAndPassword()}>Inicia sesión</button>
                        <p>¿No tienes una cuenta? <Link href="/signup"><a>Regístrate</a></Link></p>
                    </div>
                    <span>Ó</span>
                    <button className="btn_pink" onClick={() => registerWithGoogle()}>
                        <img src="/g_icon.png" alt="" />
                        Continuar con Google
                    </button>
                    {IsNewUser ? <p className="error">Debes estar registrado para iniciar sesión</p> : null}
                </div>
            </div>
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
})(AuthPage)
