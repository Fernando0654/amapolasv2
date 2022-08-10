import axios from 'axios'
import { useAuthUser } from 'next-firebase-auth'
import React, { useEffect, useState } from 'react'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import { FaRegSurprise } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getCitaR, saveCitas } from '../store/actions/cita'

export const Agendadas = ({ citas, updateAgendadas, updateExitosas, updateCanceladas }) => {

    const [Citas, setCitas] = useState([]);

    useEffect(() => {
        setCitas(citas);
    }, [citas])


    const updateCita = async (id) => {
        await axios.put(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/citas/` + citas[0].cliente, {
            _id: id,
            status: "exitosa"
        }).then(() => {
            toast.success("¡Nos da gusto!");
            const nuevoCito = Citas.filter((cita) => cita._id !== id);
            const exitoCito = Citas.filter((cita) => cita._id === id);
            console.log(exitoCito)
            _updateAgendadas(nuevoCito);
            _updateExitosas(exitoCito);
        });
    }

    const deleteCita = async (id) => {
        await axios.put(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/citas/` + citas[0].cliente, {
            _id: id,
            status: "cancelada"
        }).then(() => {
            toast.success("Cita cancelada... :c");
            const nuevoCito = Citas.filter((cita) => cita._id !== id);
            const cancelCito = Citas.filter((cita) => cita._id === id);
            _updateAgendadas(nuevoCito);
            _updateCanceladas(cancelCito);
        });
    }

    const _updateAgendadas = (data) => {
        updateAgendadas(data);
    }

    const _updateExitosas = (data) => {
        updateExitosas(data);
    }

    const _updateCanceladas = (data) => {
        updateCanceladas(data);
    }
 
    return (
        <div className="container_list">
            {
                citas.length === 0 ?
                    <div className="no_information">
                        <h1>¡No hay citas pendientes!</h1>
                        <FaRegSurprise />
                    </div>
                    :
                    Citas.map((cita: any, index: number) => (
                        <div className="badge_cita" key={index}>
                            <div className="info">
                                <div className="datos">
                                    <p><b>Servicio: </b>{cita.servicio}</p>
                                    <p><b>Precio aproximado: </b>${cita.precio.split("-")[0] + ".00-$" + cita.precio.split("-")[1] + ".00"}</p>
                                    <p><b>Día agendado: </b>{cita.fecha} a las {cita.hora}</p>
                                    <p><b>Especialista: </b>{cita.especialista}</p>
                                </div>
                                <div className="delete" onClick={() => deleteCita(cita._id)}>
                                    <MdDelete />
                                </div>
                            </div>
                            <div className="success_btn">
                                <p>¿Tu cita fue perfecta? ¡Márcala como exitosa!</p>
                                <label htmlFor="cita" onClick={() => updateCita(cita._id)}>
                                    <BsEmojiHeartEyes /> &nbsp;
                                    ¡Lo fue!
                                </label>
                            </div>
                        </div>
                    ))
            }

        </div>
    )
}
