import * as types from "../types"

export const collectionReducer = (collections = [], action: any) => {
    switch (action.type) {
        case types.GET_COLLECTIONS:
            return action.payload
        default:
            return collections;
    }
}
