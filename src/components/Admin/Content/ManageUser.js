import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>

            <div className="user-conent">
                <div>
                    <ModalCreateUser />
                </div>

                <div>
                    List User
                </div>
            </div>
        </div>
    )
}

export default ManageUser;