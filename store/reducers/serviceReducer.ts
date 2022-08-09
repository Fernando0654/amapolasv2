import * as types from "../types";

export const serviceReducer = (service = null, action: any) => {
    switch (action.type) {
        case types.SAVE_SERVICE:
            return action.payload
        case types.GET_SERVICE:
            return action.payload
        default:
            return service;
    }
}
