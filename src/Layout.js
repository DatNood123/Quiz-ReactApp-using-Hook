import App from './App';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/User/ManageUser';
import Dashboard from './components/Admin/Content/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/Auth/SignUp';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import { useSelector } from 'react-redux';
import PrivateRoute from './routes/PrivateRoute';
import { AnimatePresence } from "framer-motion";
import { Suspense } from 'react';

const NotFound = () => {
    return (
        <div className='alert alert-danger container mt-3'>
            404: Not Found Data
        </div>
    )
}

const Layout = () => {
    const isAuthenticated = useSelector(state => state.userAccount.isAuthenticated);
    const account = useSelector(state => state.userAccount.account);
    return (
        <Suspense fallback={<div>...is loading</div>}>
            <AnimatePresence mode="wait">
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route index element={<HomePage />}></Route>
                        <Route path='/users' element={
                            <PrivateRoute> <ListQuiz /> </PrivateRoute>
                        }>

                        </Route>
                    </Route>

                    <Route path='/quiz/:id' element={<DetailQuiz />}></Route>

                    {account.role === 'ADMIN' ?
                        <Route path='/admins' element={<Admin />}>
                            <Route index element={<Dashboard />}></Route>
                            <Route path='manage-users' element={<ManageUser />}></Route>
                            <Route path='manage-quizzes' element={<ManageQuiz />}></Route>
                            <Route path='manage-questions' element={<Questions />}></Route>
                        </Route>
                        :
                        ''
                    }

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
            </AnimatePresence>
        </Suspense>

    )
}

export default Layout;