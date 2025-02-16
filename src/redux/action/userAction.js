export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    };
};

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCESS
    };
};

export const updateProfile = (data) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data
    }
}
