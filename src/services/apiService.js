import axios from "../utils/axiosCustomize";

const postCreateNewUserService = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}

const getAllUserService = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUserService = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}

const deleteUserService = (userID) => {
    return axios.delete('api/v1/participant', { data: { id: userID } });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLoginService = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, {
        email: userEmail,
        password: userPassword,
        delay: 1500
    })
}

const postSignUp = (userEmail, userPassword, userName) => {
    return axios.post(`api/v1/register`, { email: userEmail, password: userPassword, username: userName })
}

const getListQuizByUserService = () => {
    return axios.get(`api/v1/quiz-by-participant`)
}

const getDataQuizService = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuizService = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data })
}

const postCreateNewQuizService = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post(`api/v1/quiz`, data)
}

const getAllQuizForAdminService = () => {
    return axios.get(`api/v1/quiz/all`)
}

const putEditQuizService = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.put(`api/v1/quiz/`, data)
}

const deleteQuizService = (quizID) => {
    return axios.delete(`api/v1/quiz/${quizID}`);
}

export {
    postCreateNewUserService, getAllUserService,
    putUpdateUserService, deleteUserService,
    getUserWithPaginate, postLoginService, postSignUp,
    getListQuizByUserService, getDataQuizService,
    postSubmitQuizService, postCreateNewQuizService,
    getAllQuizForAdminService, putEditQuizService,
    deleteQuizService
}