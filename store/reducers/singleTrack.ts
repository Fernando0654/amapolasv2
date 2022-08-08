import { SAVE_ID } from "../types";

export const singleTrack = (id = "empty", action: any) => {
    switch (action.type) {
        case SAVE_ID:
            localStorage.setItem("onlyId", action.payload.id);
            localStorage.setItem("price", action.payload.price);
            return action.payload;
        default:
            return id;
    }
}
