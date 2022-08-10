import Cita from "../../../models/Cita";
import connectMongo from "../../../utils/db";

const handler = async (req, res) => {
    const { method } = req;
    const { email } = req.query;

    switch (method) {
        case "GET":
            await connectMongo();
            try {
                const citas = await Cita.find({ cliente: email });
                console.log(citas)
                return res.status(200).json({ data: citas });
            } catch (error) {
                console.log(error)
                return res.status(500).json({ message: "Error al traer datos" });
            }
        case "POST":
            await connectMongo();
            const newCita = new Cita(req.body);
            try {
                await newCita.save();
                return res.status(200).json({ message: "Cita registrada" });
            } catch (error) {
                console.log(error)
                return res.status(500).json({ message: "Error el registrar cita" });
            }
        case "PUT":
            await connectMongo();
            try {
                const { _id, status } = req.body;
                const respuesta = await Cita.findByIdAndUpdate(_id, {
                    status: status
                })
                return res.status(200).json({ message: "Actualizado", data: respuesta });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Server error" });
            }
        default:
            return res.status(500).json({ message: "Server error" });
    }
}

export default handler
