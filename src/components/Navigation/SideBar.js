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
import { useTranslation, Trans } from 'react-i18next';

const SideBar = (props) => {
    const { t } = useTranslation();
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
                            {t('sideBar.homepage')}
                            <Link to='/' />
                        </MenuItem>

                        <MenuItem
                            icon={<FaGem />}
                        >
                            {t('sideBar.dashBoard')}
                            <Link to='/admins' />
                        </MenuItem>

                        <SubMenu
                            title={t('sideBar.management')}
                            icon={<IoMdSettings />}
                        >
                            <MenuItem>
                                {t('sideBar.quiz')}
                                <Link to='/admins/manage-quizzes' />
                            </MenuItem>
                            <MenuItem>
                                {t('sideBar.question')}
                                <Link to='/admins/manage-questions' />
                            </MenuItem>
                            <MenuItem>
                                {t('sideBar.user')}
                                <Link to='/admins/manage-users' />
                            </MenuItem>
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