import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { RiHomeHeartFill, RiUserHeartLine } from "react-icons/ri"

const Menu = () => {
    return <>
        <div className="home_bar">
            <button>
                <RiHomeHeartFill />
            </button>
            <button>
                <BsFillCalendarDateFill />
            </button>
        </div>
    </>
}

export default Menu
