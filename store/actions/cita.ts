import axios from "axios";

export const saveCitaR = (cita: any) => async (dispatch: any) => {
    await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/cita`, cita)
        .then(() => {
            dispatch({ type: "SAVE_CITA", payload: cita });
        });
}

export const getCitaR = (email: string) => async (dispatch) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/${email}`);
    const data = await res.json();
    dispatch({ type: "GET_USER_INFO", payload: data });
}
