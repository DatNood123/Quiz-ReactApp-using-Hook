import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalResult(props) {
    const { show, setShow, dataResultModal, setIsShowAnswer } = props;
    const handleClose = () => {
        setShow(false)
    };

    const handleShowAnswer = () => {
        setIsShowAnswer(true);
        handleClose()
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
                    <Modal.Title>Kết Quả </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Questions: <b>{dataResultModal.countTotal}</b></div>
                    <div>Correct Answers: <b>{dataResultModal.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={handleShowAnswer}>
                        Hiện đáp án
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleClose}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;