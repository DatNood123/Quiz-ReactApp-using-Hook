import { useState } from "react";
import SideBar from "../Navigation/SideBar";
import './Admin.scss';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import PerfectScrollBar from 'react-perfect-scrollbar';
import Language from '../Navigation/Language';
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { doLogOut } from "../../services/apiService";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const Icon = collapsed === true ? FaArrowRight : FaArrowLeft;
    const account = useSelector(state => state.userAccount.account);
    const name = `Hello, ${account.username}`;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        let res = await doLogOut(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            dispatch(doLogout());
            navigate('/login')
        } else {
            toast.error(res.EM)
        }
    }
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

                    <div className="action">
                        <Language />

                        <NavDropdown title={name} id="basic-nav-dropdown">
                            <NavDropdown.Item >
                                {t('header.profile')}
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={() => handleLogOut()}>
                                {t('header.logOut')}
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>

                <div className="admin-main">
                    <PerfectScrollBar>
                        <Outlet />
                    </PerfectScrollBar>
                </div>
            </div>
        </div>
    )
}

export default Admin;