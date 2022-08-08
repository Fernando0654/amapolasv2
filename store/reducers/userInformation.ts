import * as types from "../types";

export const userInformation = (user = {}, action: any) => {
    switch (action.type) {
        case types.SAVE_USER_INFO:
            return action.payload
        case types.GET_USER_INFO:
            return action.payload
        default:
            return user;
    }
}
