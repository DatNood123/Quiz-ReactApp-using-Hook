import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { postChangePassword } from "../../services/apiService";
import { toast } from 'react-toastify';

const ChangePasswordComponent = () => {
    const [isShowOldPass, setIsShowOldPass] = useState(false);
    const [isShowNewPass, setIsShowNewPass] = useState(false);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const IconOldPass = isShowOldPass === true ? HiOutlineEye : HiOutlineEyeOff;
    const IconNewPass = isShowNewPass === true ? HiOutlineEye : HiOutlineEyeOff;
    const IconConfirmPass = isShowConfirmPass === true ? HiOutlineEye : HiOutlineEyeOff;

    const handleChangeShowHidePass = (type) => {
        if (type === 'OLD') {
            setIsShowOldPass(!isShowOldPass)
        }

        if (type === 'NEW') {
            setIsShowNewPass(!isShowNewPass)
        }

        if (type === 'CONFIRM') {
            setIsShowConfirmPass(!isShowConfirmPass)
        }
    }

    const handleOnChangeInput = (event, type) => {
        if (type === 'OLD') {
            setOldPass(event.target.value);
        }

        if (type === 'NEW') {
            setNewPass(event.target.value)
        }

        if (type === 'CONFIRM') {
            setConfirmPass(event.target.value)
        }
    }

    const handleSubmitChangePassword = async () => {
        if (oldPass && newPass && confirmPass) {
            if (newPass === confirmPass) {
                let res = await postChangePassword(oldPass, newPass);
                if (res && res.EC === 0) {
                    toast.success('Change password succeed!');
                    setOldPass('');
                    setNewPass('');
                    setConfirmPass('');
                } else {
                    toast.error(res.EM)
                }
            } else {
                toast.error('New and confirm pass not the same')
            }
        } else {
            toast.error('Missing value')
        }
    }

    return (
        <div className="change-password-container">
            <div className="old-pass form-group input">
                <label>Old Password</label>
                <div className="input-content">
                    <input
                        onChange={(event) => handleOnChangeInput(event, 'OLD')}
                        value={oldPass}
                        type={isShowOldPass === true ? 'text' : 'password'}
                        className="form-control"></input>
                    <IconOldPass
                        className="icon"
                        onClick={() => handleChangeShowHidePass('OLD')}
                    />
                </div>
            </div>

            <div className="new-pass form-group input">
                <label>New Password</label>
                <div className="input-content">
                    <input
                        onChange={(event) => handleOnChangeInput(event, 'NEW')}
                        value={newPass}
                        type={isShowNewPass === true ? 'text' : 'password'}
                        className="form-control"></input>
                    <IconNewPass
                        className="icon"
                        onClick={() => handleChangeShowHidePass('NEW')}
                    />
                </div>
            </div>

            <div className="confirm-pass form-group input">
                <label>Confirm Password</label>
                <div className="input-content">
                    <input
                        onChange={(event) => handleOnChangeInput(event, 'CONFIRM')}
                        value={confirmPass}
                        type={isShowConfirmPass === true ? 'text' : 'password'}
                        className="form-control"></input>
                    <IconConfirmPass
                        className="icon"
                        onClick={() => handleChangeShowHidePass('CONFIRM')}
                    />
                </div>
            </div>

            <div className="btn-save">
                <button onClick={() => handleSubmitChangePassword()}>Save</button>
            </div>
        </div>
    )
}

export default ChangePasswordComponent;