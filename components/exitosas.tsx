import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegSurprise } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

export const Exitosas = ({ citas }) => {

    return (
        <div className="container_list">
            {
                citas.length === 0 ?
                    <div className="no_information">
                        <h1>¡No hay citas exitosas!</h1>
                        <FaRegSurprise />
                    </div> :
                    citas.map((cita: any, index: number) => (
                        <div className="badge_cita" key={index}>
                            <div className="info">
                                <div className="datos">
                                    <p><b>Servicio: </b>{cita.servicio}</p>
                                    <p><b>Precio aproximado: </b>${cita.precio.split("-")[0] + ".00-$" + cita.precio.split("-")[1] + ".00"}</p>
                                    <p><b>Día agendado: </b>{cita.fecha} a las {cita.hora}</p>
                                    <p><b>Especialista: </b>{cita.especialista}</p>
                                </div>
                            </div>
                            <div className="success_btn">
                                <p>¡Tu cita fue perfecta! Nos da gusto <AiFillHeart /> </p>
                            </div>
                        </div>
                    ))
            }

        </div>
    )
}
