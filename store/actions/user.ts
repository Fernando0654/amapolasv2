export const saveUser = (user) => (dispatch) => {
    dispatch({ type: "SAVE_USER_INFO", payload: user });
}

export const getUser = (email: string) => async (dispatch) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/userByEmail/${email}`);
    const data = await res.json();
    dispatch({ type: "GET_USER_INFO", payload: data });
}
