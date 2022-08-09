import * as types from "../types";

export const priceReducer = (price = null, action: any) => {
    switch (action.type) {
        case types.SAVE_PRICE:
            return action.payload
        case types.GET_PRICE:
            return action.payload
        default:
            return price;
    }
}
