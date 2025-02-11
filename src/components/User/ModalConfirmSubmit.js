import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function ModalConfirmSubmit(props) {
    const { isShowConfirmModal, setIsShowConfirmModal } = props;
    const handleClose = () => {
        setIsShowConfirmModal(false)
    };

    const handleSubmit = () => {
        props.handleFinishQuiz();
        handleClose();
    }

    return (
        <>
            <Modal
                show={isShowConfirmModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Submit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc là muốn nộp bài chứ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hông
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleSubmit()}
                    >
                        Chắc chắn
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmSubmit;