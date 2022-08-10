import * as types from "../types";

export const citaReducer = (cita = {}, action: any) => {
    switch (action.type) {
        case types.SAVE_CITA:
            return action.payload
        case types.GET_CITA:
            return action.payload
        default:
            return cita;
    }
}
