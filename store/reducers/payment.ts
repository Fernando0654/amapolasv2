import { TOTAL_COST } from "../types";

export const payment = (total = -1, action: any) => {
    switch (action.type) {
        case TOTAL_COST:
            return action.payload;
        default:
            return total;
    }
}
