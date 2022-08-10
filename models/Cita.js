import { Schema, model, models } from 'mongoose';

const citaSchema = new Schema({
    cliente: { type: String, required: true },
    servicio: { type: String, required: true },
    precio: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    especialista: { type: String, required: true },
    status: { type: String, required: false, default: "pendiente"}
});

const Cita = models.Cita || model('Cita', citaSchema);

export default Cita;
