import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import _ from 'lodash';
import Select from "react-select";
import { putEditQuizService } from "../../../../services/apiService";

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
]

const ModalEditQuiz = (props) => {
    const { show, setShow, dataEdit } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [level, setLevel] = useState('EASY')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    const handleClose = () => {
        setShow(false);
    };


    useEffect(() => {
        if (!_.isEmpty(dataEdit)) {
            setName(dataEdit.name)
            setDescription(dataEdit.description)
            setLevel(dataEdit.difficulty)
            setImage(dataEdit.image)
            setPreviewImage(dataEdit.image ? `data:image/jpeg;base64,${dataEdit.image}` : "")
        }
    }, [dataEdit])

    const handeUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handleSubmitEdit = async () => {
        let res = await putEditQuizService(dataEdit.id, description, name, level.value, image);
        if (res && res.EC === 0) {
            handleClose();
            toast.success(res.EM);
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
                size="xl"
                backdrop="static"
                className="modal-create-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>EDIT QUIZ</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className='col-md-6'>
                            <Select
                                options={options}
                                placeholder={"Choose level"}
                                defaultValue={level}
                                onChange={setLevel}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label upload-image" htmlFor="labelUpload">Upload Avatar <IoCloudUploadOutline /></label>
                            <input
                                type="file"
                                hidden
                                id="labelUpload"
                                onChange={(event) => handeUploadImage(event)}
                            ></input>
                        </div>

                        <div className="col-md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} alt="" />
                                :
                                <span>Preview Image</span>
                            }
                        </div>


                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={() => handleSubmitEdit()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ModalEditQuiz;