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

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.userAccount.isAuthenticated);
    const account = useSelector(state => state.userAccount.account);
    const name = `Hello, ${account.username.toUpperCase()}`;
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('./login')
    }

    const handleSignUp = () => {
        navigate('./register')
    }

    console.log(account)

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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to='/' className='navbar-brand'>QUIZZAT</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>Quiz</NavLink>
                        {account.role === 'ADMIN' ? <NavLink to='/admins' className='nav-link'>Admin</NavLink> : ''}

                    </Nav>

                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button
                                    className='btn-login'
                                    onClick={() => handleLogin()}
                                >
                                    Log In
                                </button>
                                <button
                                    className='btn-signup'
                                    onClick={() => handleSignUp()}
                                >Sign Up</button>
                            </>

                            :
                            <NavDropdown title={name} id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    Profile
                                </NavDropdown.Item>

                                <NavDropdown.Item onClick={() => handleLogOut()}>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;