import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.userAccount.isAuthenticated);
    const account = useSelector(state => state.userAccount.account);
    const name = `Hello, ${account.username.toUpperCase()}`;

    const handleLogin = () => {
        navigate('./login')
    }

    const handleSignUp = () => {
        navigate('./register')
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to='/' className='navbar-brand'>QUIZZAT</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>User</NavLink>
                        <NavLink to='/admins' className='nav-link'>Admin</NavLink>
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
                                    Log out
                                </NavDropdown.Item>

                                <NavDropdown.Item >
                                    Profile
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