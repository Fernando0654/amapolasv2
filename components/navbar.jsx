import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import { RiUserHeartLine } from "react-icons/ri"
import firebase from "firebase";

const Navbar = () => {
    const user = useAuthUser();
    const [ShowMenu, setShowMenu] = useState(false);
    const [IsLogginOut, setIsLogginOut] = useState(false);

    const signOutAnima = () => {
        setIsLogginOut(true);
        setTimeout(() => {
            firebase.auth().signOut()
        }, 1000);
    }

    return <>
        <div className="sidebar" onClick={() => setShowMenu(!ShowMenu)}>
            <RiUserHeartLine />
        </div>
        <div className="wrapper" onClick={() => setShowMenu(!ShowMenu)} style={ShowMenu ? {display: "block"} : {display: "none"}}></div>
        <div className="sidebar_body" style={ShowMenu ? {left: "0%"} : {left: "-100%"}}>
            <div className="pink_area">
                <img src={user.photoURL} alt="" />
                <h4>{user.displayName}</h4>
            </div>
            <img src="/assets/img/Hi_Bye.gif" alt="" className="anima" style={IsLogginOut ? { right: "0%" } : {right: "-100%"}} />
            <button onClick={() => signOutAnima()}>Cerrar sesión</button>
        </div>
    </>
}

export default Navbar
