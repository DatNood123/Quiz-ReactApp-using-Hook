import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { IoPersonAddOutline } from "react-icons/io5";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUserService } from '../../../services/apiService';

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

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
                    <TableUser listUser={listUser} />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />
            </div>
        </div>
    )
}

export default ManageUser;