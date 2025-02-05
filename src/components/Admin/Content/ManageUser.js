import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { IoPersonAddOutline } from "react-icons/io5";
import { useState } from "react";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>

            <div className="user-conent">
                <div className="btn-add-new">
                    <button onClick={() => setShowModalCreateUser(true)}>Thêm mới <IoPersonAddOutline /></button>
                </div>

                <div>
                    List User
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />
            </div>
        </div>
    )
}

export default ManageUser;