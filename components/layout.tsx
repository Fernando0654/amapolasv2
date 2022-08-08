import { NextPage } from "next"
import Head from "next/head"
import { ToastContainer, toast } from 'react-toastify';
import Menu from "./menu";

const Layout: NextPage = (props) => (
    <div>
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
        <ToastContainer autoClose={1000} />
        <main>
            {props.children}
        </main>
    </div>
)

export default Layout
