import Cita from "../../models/Cita";
import connectMongo from "../../utils/db";

const handler = async (req, res) => {
    const { method } = req;
    switch (method) {
        case "POST":
            await connectMongo();
            const newCita = new Cita(req.body);
            try {
                await newCita.save();
                return res.status(200).json({message: "Cita registrada"}); 
            } catch (error) {
                console.log(error)
                return res.status(500).json({message: "Error el registrar cita"});
            }
        default:
            return res.status(500).json({message: "Server error"});
    }
}

export default handler
