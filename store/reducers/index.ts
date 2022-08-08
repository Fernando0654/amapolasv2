import { combineReducers } from "redux"
import { collectionReducer } from "./collections";
import { musicReducer } from "./musicReducer";
import { payment } from "./payment";
import { singleTrack } from "./singleTrack";
import { userInformation } from "./userInformation";

export default combineReducers({
    list: musicReducer,
    id: singleTrack,
    user: userInformation,
    total: payment,
    collections: collectionReducer
});
