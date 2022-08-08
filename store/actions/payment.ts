export const getTotalCostDis = (data) => (dispatch) => {
    dispatch({ type: "TOTAL_COST", payload: data });
}
