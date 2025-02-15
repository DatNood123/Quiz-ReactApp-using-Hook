import './ManageQuiz.scss';
import Select from 'react-select';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from 'react';
import { toast } from "react-toastify";
import { postCreateNewQuizService } from '../../../../services/apiService';
import QuizTable from './QuizTable';
import { Accordion } from 'react-bootstrap';
import UpdateQAQuiz from './UpdateQAQuiz';
import AssignQuiz from './AssignQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
]

const ManageQuiz = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('EASY');
    const [image, setImage] = useState(null);
    const [refreshListQuiz, setRefresshListQuiz] = useState(false)

    const handeUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error("Invalid value");
            return
        }
        let res = await postCreateNewQuizService(description, name, level?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('');
            setDescription('');
            setImage('');
            setRefresshListQuiz(prev => !prev);
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quiz
            </div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create New Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border border-3 border-dark rounded-3 p-3">
                                <legend className="float-none w-auto px-3">CREATE NEW QUIZ</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>

                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Description'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label>Description</label>
                                </div>

                                <div className='my-3'>
                                    <Select
                                        options={options}
                                        placeholder={"Choose level"}
                                        defaultValue={level}
                                        onChange={setLevel}
                                    />
                                </div>

                                <div className='more-action'
                                    style={{
                                        border: "1px solid #ccc",
                                        width: "fit-content",
                                        padding: "10px",
                                        borderRadius: "8px",
                                    }}>
                                    <label
                                        style={{ margin: "auto 0" }}
                                        className="form-label upload-image"
                                    >
                                        Upload Image <IoCloudUploadOutline />
                                    </label>
                                    <input
                                        className='form-control my-2'
                                        type='file'
                                        onChange={(event) => handeUploadImage(event)}
                                    ></input>
                                </div>

                                <div className='mt-3'>
                                    <button
                                        onClick={() => handleSubmitQuiz()}
                                        className='btn btn-success'>SAVE</button>
                                </div>
                            </fieldset>
                        </div>

                        <div className="list-quiz">
                            <div className='title-list-table'>LIST QUIZ</div>
                            <QuizTable
                                refreshListQuiz={refreshListQuiz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q&A Quiz</Accordion.Header>
                    <Accordion.Body>
                        <UpdateQAQuiz />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign Quiz for User</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>

    )
}

export default ManageQuiz;