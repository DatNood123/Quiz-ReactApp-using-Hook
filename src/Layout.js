import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import Dashboard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/Auth/SignUp';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';


const NotFound = () => {
    return (
        <div className='alert alert-danger container mt-3'>
            404: Not Found Data
        </div>
    )
}

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path='/users' element={<ListQuiz />}></Route>
                </Route>

                <Route path='/quiz/:id' element={<DetailQuiz />}></Route>

                <Route path='/admins' element={<Admin />}>
                    <Route index element={<Dashboard />}></Route>
                    <Route path='manage-users' element={<ManageUser />}></Route>
                    <Route path='manage-quizzes' element={<ManageQuiz />}></Route>
                    <Route path='manage-questions' element={<Questions />}></Route>
                </Route>

                <Route path='/login' element={<Login />}>
                </Route>

                <Route path='/register' element={<SignUp />}>
                </Route>

                <Route path='*' element={<NotFound />}>
                </Route>
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newesOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Layout;