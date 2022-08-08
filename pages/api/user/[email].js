import User from "../../../models/User";
import connectMongo from "../../../utils/db";


const handler = async (req, res) => {
    const { email } = req.query;
    try {
        await connectMongo();
    } catch (error) {
        return res.status(500).json({ message: "Something went fucking wrong, dude" })
    }
    switch (req.method) {
        case "GET":
            try {
                const userExist = await User.findOne({ email: email });
                if (userExist) {
                    // Hacer el chequeo de la contraseña a través de la carga
                } else {
                    return res.status(200).json({ message: "Este usuario no existe, padrino, no mms", isNewUser: true })
                }
            } catch (error) {
                return res.status(200).json({ message: "ERROR INESPERADO", isNewUser: null })
            }
            break;
        case "POST":
            try {
                const rol = email.split("@")[1] === "amapolas.com.mx" ? "empleado" : "cliente";
                const { nombre, correo, password, phone, img, API } = req.body;
                const newUser = new User({
                    nombre: nombre,
                    email: correo,
                    password: password,
                    phone: phone,
                    img: img,
                    rol: rol,
                    API: API
                });
                if(API) {
                    newUser.password = "Google"
                } else {
                    newUser.password = await newUser.encryptPassword(password);
                }
                await newUser.save();
                return res.status(200).json({ message: "Usuario registrado" });
            } catch (error) {
                console.log("Something went wrong: ", error)
            }
        default:
            break;
    }
    return res.status(200).json({ success: true })
}

export default handler
