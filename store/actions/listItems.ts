export const getItems = (data) => (dispatch) => {
    dispatch({ type: "FETCH_ALL", payload: data });
}

export const saveItems = (data) => (dispatch) => {
    dispatch({ type: "SAVE_ITEM", payload: data });
}

export const deleteItem = (data) => (dispatch) => {
    dispatch({ type: "FETCH_ALL", payload: data });
}

export const getItemById = (data) => (dispatch) => {
    dispatch({ type: "GET_ITEM_BY_ID", payload: data });
}

export const clearAll = () => (dispatch) => {
    dispatch({type: "CLEAR_ALL", payload: []});
}
