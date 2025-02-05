import { useState } from "react";
import SideBar from "../Navigation/SideBar";
import './Admin.scss';
import { FaBars, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const Icon = collapsed === true ? FaArrowRight : FaArrowLeft;
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>

            <div className="admin-content">
                <div className="admin-header">
                    <div className="btn-show-hide" onClick={() => setCollapsed(!collapsed)}>
                        <Icon />
                    </div>
                </div>

                <div className="admin-main">
                    <Outlet />
                </div>
            </div>

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
        </div>
    )
}

export default Admin;