import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUserService } from '../../../../services/apiService';
import { toast } from 'react-toastify';

function ModalDeleteUser(props) {
    const { show, setShow, dataDelete } = props;
    const handleClose = () => {
        setShow(false)
    };

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUserService(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListUserWithPaginate(1);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Mày có chắc là muốn xóa thằng <b>{dataDelete.username ? dataDelete.username : "này"}</b> <br></br>
                    Có email là <b>{dataDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hông
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleSubmitDeleteUser()}
                    >
                        Chắc chắn
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;