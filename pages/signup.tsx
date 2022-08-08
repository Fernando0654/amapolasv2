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
const SignUp = () => {
    const dispatch = useDispatch();
    const [Carga, setCarga] = useState(null);

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
            toast.error("Las contraseñas no coinciden");
            console.log("passwords")
            return;
        }
        axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/` + Carga.email, Carga)
            .then((res) => {
                console.log(res)
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
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <div className="login_container signup">
                <form className="container" onSubmit={(e) => registerWithUserAndPassword(e)}>
                    <h1>Crea una cuenta</h1>
                    <br />
                    <input type="email" name="correo" placeholder="Correo *" onChange={(e) => handleChange(e)} required />
                    <input type="password" name="password" placeholder="Contraseña *" onChange={(e) => handleChange(e)} required />
                    <input type="password" name="password2" placeholder="Repetir contraseña *" onChange={(e) => handleChange(e)} required />
                    <input type="number" name="phone" placeholder="Número de teléfono *" onChange={(e) => handleChange(e)} required />
                    <p>
                        Si creas una cuenta en nuestra aplicación estarás aceptando <a href="#">Términos y condiciones</a> y <a href="#">Política de privacidad</a>
                    </p>
                    <button type="submit">Crear cuenta</button>
                    <p>¿Ya tienes una cuenta? <Link href="/auth"><a style={{ color: "#6f70ff", textDecoration: "none", fontWeight: "bold" }}>Inicia sesión</a></Link></p>
                    <span>Ó</span>
                    <button className="btn_pink" onClick={() => registerWithGoogle()}>
                        <img src="/g_icon.png" alt="" />
                        Continuar con Google
                    </button>
                </form>
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
})(SignUp)
