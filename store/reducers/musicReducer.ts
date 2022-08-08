import * as types from "../types"

export const musicReducer = (state = [], action: any) => {
    switch (action.type) {
        case types.FETCH_ALL:
            return action.payload
        case types.SAVE_ITEM:
            return [...state, action.payload];
        case types.GET_ITEM_BY_ID:
            return action.payload;
        case types.CLEAR_ALL:
            return [];
        default:
            return state;
    }
}
