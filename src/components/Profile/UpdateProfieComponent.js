import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { postUpdateProfile } from "../../services/apiService";
import { updateProfile } from "../../redux/action/userAction";

const UpdateProfieComponent = (props) => {
    const account = useSelector(state => state.userAccount.account);
    const dispatch = useDispatch();
    const [userName, setUsername] = useState(account.username);
    const [image, setImage] = useState();

    const getImagePreview = (image) => {
        if (!image) return "";
        return image.startsWith("data:image") ? image : `data:image/png;base64,${image}`;
    };
    const [previewImage, setPreviewImage] = useState(getImagePreview(account.image))

    const handleChangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            setImage(file);
            let newPreview = URL.createObjectURL(file);
            setPreviewImage(newPreview);

            return () => URL.revokeObjectURL(newPreview);
        }
    };

    const handleChangeProfile = async () => {
        let res = await postUpdateProfile(userName, image);
        if (res && res.EC === 0) {
            toast.success('Update profile succeed!');
            let imageBase64 = await toBase64(image);
            let data = {
                userName: userName,
                imageBase64: imageBase64
            }
            dispatch(updateProfile(data))
        } else {
            toast.error(res.EM)
        }
    }

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    useEffect(() => {
        if (account.image) {
            fetchAvatar();
        }
    }, [account.image])

    const fetchAvatar = async () => {
        if (!account.image) return;

        let base64Data = account.image.startsWith("data:image")
            ? account.image
            : `data:image/png;base64,${account.image}`;

        try {
            let avatar = await urlToFile(base64Data, `Image_${account.email}.png`, 'image/png');
            setImage(avatar);
        } catch (error) {
            console.error("Lỗi khi chuyển đổi Base64 sang File:", error);
        }
    };

    const urlToFile = async (url, filename, mimeType) => {
        //nếu là base64 thì chuyển thành url rồi mới chuyển thành file
        if (url.startsWith("data:image")) {
            let arr = url.split(",");
            let bstr = atob(arr[1]);
            let u8arr = new Uint8Array(bstr.length);
            for (let i = 0; i < bstr.length; i++) {
                u8arr[i] = bstr.charCodeAt(i);
            }
            return Promise.resolve(new File([u8arr], filename, { type: mimeType }));

        } else {
            const res = await fetch(url);
            const blob = await res.blob();
            return new File([blob], filename, { type: mimeType });
        }
    };

    return (
        <>
            <div className='email-username'>
                <div className='email form-group'>
                    <label>Email</label>
                    <input
                        className='form-control'
                        value={account.email}
                        disabled
                    />
                </div>

                <div className='username'>
                    <label>Username</label>
                    <input
                        className='form-control'
                        value={userName}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
            </div>

            <div className='avatar-content'>
                <div className='change-avatar'>
                    <label htmlFor="avatarUpload">Change avatar</label>
                    <input
                        onChange={(event) => handleChangeImage(event)}
                        type='file'
                        id="avatarUpload"
                        hidden></input>
                </div>

                <div className='avatar'>
                    <img src={previewImage} alt=""></img>
                </div>
            </div>

            <div className='btn-save'>
                <button onClick={() => handleChangeProfile()}>Lưu</button>
            </div>
        </>
    )
}

export default UpdateProfieComponent;