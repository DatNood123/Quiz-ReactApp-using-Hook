import { useState } from 'react';
import './SignUp.scss';
import { FiUser } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { postSignUp } from '../../services/apiService';
import { toast } from 'react-toastify';
import Language from '../Navigation/Language';
import { useTranslation } from 'react-i18next';

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const Icon = showPassword === true ? HiOutlineEyeOff : HiOutlineEye;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSignUp = async () => {
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
        if (!userName) {
            toast.error("Invalid username");
            return
        }

        //submit
        let data = await postSignUp(email, password, userName);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === "Enter") {
            handleSignUp();
        }
    }

    return (
        <div className="sign-up-container">
            <div className='signup-header'>
                <span style={{ textAlign: "center" }}> {t('signIn.hasAccount')} </span>
                <button onClick={() => navigate("/login")}>{t('signIn.signin')}</button>
                <Language />
            </div>

            <div className='title col-4'>
                QUIZZAT
            </div>

            <div className='content-form col-4'>
                <div className='header'>
                    {t('signIn.signUp')}
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
                            />
                            <Icon
                                className='icon-password'
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <div className='input'>
                            <input
                                type={'text'}
                                className='form-control'
                                placeholder={t('signIn.username')}
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </div>
                    </div>

                    <div className='btn-sign-up'>
                        <button onClick={() => handleSignUp()}>{t('signIn.register')}</button>
                    </div>

                    <div className='back-to-home' onClick={() => { navigate("/") }}>
                        <BiLeftArrow /> {t('signIn.toHome')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;