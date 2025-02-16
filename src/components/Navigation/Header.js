import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { doLogOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import ModalProfile from '../Profile/ModalProfile';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.userAccount.isAuthenticated);
    const account = useSelector(state => state.userAccount.account);
    const name = `Hello, ${account.username}`;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isShowModalProfile, setIsShowModalProfile] = useState(false);

    const handleLogin = () => {
        navigate('./login')
    }

    const handleSignUp = () => {
        navigate('./register')
    }

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
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to='/' className='navbar-brand'>QUIZZAT</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='/' className='nav-link'>{t('header.homepage')}</NavLink>
                            <NavLink to='/users' className='nav-link'>{t('header.quiz')}</NavLink>
                            {account.role === 'ADMIN' ? <NavLink to='/admins' className='nav-link'>{t('header.management')}</NavLink> : ''}

                        </Nav>

                        <Nav>
                            <Language />

                            {isAuthenticated === false ?
                                <>
                                    <button
                                        className='btn-login'
                                        onClick={() => handleLogin()}
                                    >
                                        {t('header.signIn')}
                                    </button>

                                    <button
                                        className='btn-signup'
                                        onClick={() => handleSignUp()}
                                    >
                                        {t('header.signUp')}
                                    </button>
                                </>

                                :
                                <NavDropdown title={name} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => setIsShowModalProfile(true)}>
                                        {t('header.profile')}
                                    </NavDropdown.Item>

                                    <NavDropdown.Item onClick={() => handleLogOut()}>
                                        {t('header.logOut')}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ModalProfile
                show={isShowModalProfile}
                setShow={setIsShowModalProfile}
            />
        </>

    );
}

export default Header;