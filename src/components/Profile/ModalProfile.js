import Modal from 'react-bootstrap/Modal';
import { Tabs, Tab } from 'react-bootstrap';
import './ModalProfile.scss';
import UpdateProfieComponent from './UpdateProfieComponent';

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
                            Tab content for Profile
                        </Tab>
                        <Tab eventKey="history" title="History">
                            Tab content for Contact
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProfile;