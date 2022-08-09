export const getService = (servicio: any) => async (dispatch: any) => {
    dispatch({ type: "GET_SERVICE", payload: servicio });
}

export const getPrice = (price: any) => async (dispatch: any) => {
    dispatch({ type: "GET_PRICE", payload: price });
}
