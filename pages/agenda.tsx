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

const Agenda = () => {

    return (
        <>
            <Head>
                <title>Amapola | Detalles del servicio</title>
            </Head>
            <Layout>
                <h1>Aquí va la agenda</h1>
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
