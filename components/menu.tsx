import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { RiHomeHeartFill, RiUserHeartLine } from "react-icons/ri"
import Link from "next/link"

const Menu = () => {
    return <>
        <div className="home_bar">
            <Link href="/home">
            <button>
                <RiHomeHeartFill />
            </button>
            </Link>
            <Link href="/agenda">
            <button>
                <BsFillCalendarDateFill />
            </button>
            </Link>
        </div>
    </>
}

export default Menu
