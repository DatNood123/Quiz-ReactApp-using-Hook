import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { IoPersonAddOutline } from "react-icons/io5";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUserService } from '../../../services/apiService';
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setshowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({})
    const [listUser, setListUser] = useState([])

    // === componentDidMount
    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUserService();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setshowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate("")
    }

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
                    <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                    />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />

                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setshowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
            </div>
        </div>
    )
}

export default ManageUser;