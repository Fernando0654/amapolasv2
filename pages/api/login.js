import { setAuthCookies } from "next-firebase-auth"
import initAuth from "../../initAuth"

initAuth();

const handler = async (req, res) => {
    try {
        console.log(req)
        await setAuthCookies(req, res);
    } catch (e) {
        return res.status(500).json({ error: 'Unexpected error.' + e })
    }
    return res.status(200).json({ success: true })
}

export default handler
