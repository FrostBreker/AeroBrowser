export const GET_USER = 'GET_USER';

export const getUser = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_USER,
            payload: data,
        });
    };
};
