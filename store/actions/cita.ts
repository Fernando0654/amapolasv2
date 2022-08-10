import axios from "axios";

export const saveCitaR = (cita: any) => async (dispatch: any) => {
    await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/citas/` + cita.cliente, cita)
        .then(() => {
            dispatch({ type: "SAVE_CITA", payload: cita });
        });
}

export const getCitaR = (email: string) => async (dispatch) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/citas/${email}`);
    const data = await res.json();
    dispatch({ type: "GET_CITA", payload: data });
}

export const saveCitas = (citas) => (dispatch) => {
    dispatch({type: "SAVE_CITAS", payload: citas})
}