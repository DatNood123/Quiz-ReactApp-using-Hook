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

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path='/users' element={<User />}></Route>
                </Route>
                <Route path='/admins' element={<Admin />}>
                    <Route index element={<Dashboard />}></Route>
                    <Route path='manage-users' element={<ManageUser />}></Route>
                </Route>

                <Route path='/login' element={<Login />}>
                </Route>

                <Route path='/register' element={<SignUp />}>
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