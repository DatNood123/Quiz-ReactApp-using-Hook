import { useState } from 'react';
import './Login.scss';
import { FiUser } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const Icon = showPassword === true ? HiOutlineEyeOff : HiOutlineEye;

    const navigate = useNavigate();

    const handleLogin = async () => {
        //validate

        //submit
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className="login-container">
            <div className='title col-4'>
                QUIZZAT
            </div>

            <div className='content-form col-4'>
                <div className='header'>
                    SIGN IN
                </div>

                <div className='form-content'>
                    <div className='form-group'>
                        <div className='input'>
                            <input
                                type={'email'}
                                className='form-control'
                                placeholder='Email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}

                            />
                            <FiUser className='icon' />
                        </div>

                    </div>

                    <div className='form-group'>
                        <div className='input'>
                            <input
                                type={showPassword === false ? 'password' : 'text'}
                                className='form-control'
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Icon
                                className='icon-password'
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>

                    <span>Forgot password?</span>

                    <div className='btn-login'>
                        <button onClick={() => handleLogin()}>Sign In</button>
                    </div>

                    <span style={{ textAlign: "center" }}> Don't have account? </span>

                    <div className='btn-sign-up'>
                        <div className='back-to-home' onClick={() => { navigate("/") }}>
                            <BiLeftArrow /> Back to home
                        </div>
                        Or
                        <button onClick={() => navigate("/register")}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;