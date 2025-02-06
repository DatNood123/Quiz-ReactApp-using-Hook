import './SideBar.scss';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaHome, FaGem, FaGithub } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";
import sidebarBg from '../../assets/bg2.jpg';

const SideBar = (props) => {

    const { image, collapsed, rtl, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Quizzat SideBar
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaHome />}
                        >
                            Trang chủ
                            <Link to='/' />
                        </MenuItem>

                        <MenuItem
                            icon={<FaGem />}
                        >
                            Dashboard
                            <Link to='/admins' />
                        </MenuItem>

                        <SubMenu
                            title={"Quản lý"}
                            icon={<IoMdSettings />}
                        >
                            <MenuItem>
                                Quản lý người dùng
                                <Link to='/admins/manage-users' />
                            </MenuItem>
                            <MenuItem>Quản lý câu hỏi</MenuItem>
                            <MenuItem>Quản lý câu trả lời</MenuItem>

                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                    >
                        <a
                            href="https://github.com/DatEkko"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                My Github
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;