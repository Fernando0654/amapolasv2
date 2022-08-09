import { combineReducers } from "redux"
import { priceReducer } from "./priceReducer";
import { serviceReducer } from "./serviceReducer";


export default combineReducers({
    precio: priceReducer,
    servicio: serviceReducer
});
