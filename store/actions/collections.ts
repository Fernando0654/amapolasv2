export const getCollectionsR = (email) => async (dispatch) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/payment/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const { data } = await res.json();
    const pre_data = Object.entries(Object.keys(data).map((key: any) => ({ id: key, ...data[key] })));
    let payments = [];
    for (let i = 0; i < pre_data.length; i++) {
        payments.push(pre_data[i][1]);
    }
    // Getting Id's
    let _idSongs = "";
    for (let index = 0; index < payments.length; index++) {
        payments[index].idSongs.forEach((idSongs) => {
            _idSongs += idSongs + ",";
        })
    }
    _idSongs = _idSongs.substring(0, _idSongs.length - 1);
    dispatch({ type: "GET_COLLECTIONS", payload: _idSongs });
}
