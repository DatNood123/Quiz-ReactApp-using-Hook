import { useState } from 'react';
import './Login.scss';
import { FiUser } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { postLoginService } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner4 } from "react-icons/im";
import Language from '../Navigation/Language';
import { useTranslation, Trans } from 'react-i18next';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const Icon = showPassword === true ? HiOutlineEyeOff : HiOutlineEye;
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email!!!");
            return
        }

        if (!password) {
            toast.error("Invalid password");
            return
        }

        //submit
        setIsLoading(true);

        let data = await postLoginService(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    }

    return (

        <div className="login-container">
            <div className='login-header'>
                <span style={{ textAlign: "center" }}> {t('signIn.noAccount')} </span>
                <button onClick={() => navigate("/register")}>{t('signIn.signup')}</button>
                <Language />
            </div>
            <div className='title col-4'>
                QUIZZAT
            </div>

            <div className='content-form col-4'>
                <div className='header'>
                    {t('signIn.signIn')}
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
                                placeholder={t('signIn.password')}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                            <Icon
                                className='icon-password'
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>

                    <span>{t('signIn.forgot')}</span>

                    <div className='btn-login'>
                        <button
                            onClick={() => handleLogin()}
                            disabled={isLoading}
                        >
                            <span>{t('signIn.login')}</span>
                            {isLoading === true && <ImSpinner4 className='loadingIcon' />};
                        </button>
                    </div>

                    <div className='back-to-home' onClick={() => { navigate("/") }}>
                        <BiLeftArrow /> {t('signIn.toHome')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;