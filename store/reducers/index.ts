import { combineReducers } from "redux"
import { citaReducer } from "./cita";
import { priceReducer } from "./priceReducer";
import { serviceReducer } from "./serviceReducer";


export default combineReducers({
    precio: priceReducer,
    servicio: serviceReducer,
    cita: citaReducer
});
