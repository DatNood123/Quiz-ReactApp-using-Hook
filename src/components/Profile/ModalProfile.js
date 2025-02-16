import Modal from 'react-bootstrap/Modal';
import { Tabs, Tab } from 'react-bootstrap';
import './ModalProfile.scss';
import UpdateProfieComponent from './UpdateProfieComponent';
import ChangePasswordComponent from './ChangePasswordComponent';
import HistoryComponent from './HistoryComponent';

const ModalProfile = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false)
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
                className='profile-modal-container'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="profile" title="Profile">
                            <UpdateProfieComponent />
                        </Tab>
                        <Tab eventKey="changePassword" title="Change Password">
                            <ChangePasswordComponent />
                        </Tab>
                        <Tab eventKey="history" title="History">
                            <HistoryComponent />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProfile;