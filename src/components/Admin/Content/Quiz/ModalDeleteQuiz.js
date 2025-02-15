import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuizService } from '../../../../services/apiService';

function ModalDeleteQuiz(props) {
    const { show, setShow, dataDelete } = props;
    const handleClose = () => {
        setShow(false)
    };

    const handleDeleteQuiz = async () => {
        let res = await deleteQuizService(dataDelete.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await props.fectchQuiz();
        } else {
            toast.error(res.EM);
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
                    Mày có chắc là muốn xóa "<b>{dataDelete.name}</b>" hay không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hông
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDeleteQuiz()}
                    >
                        Chắc chắn
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;