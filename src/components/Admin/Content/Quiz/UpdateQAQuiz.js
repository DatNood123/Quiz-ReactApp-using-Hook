import { useEffect, useState } from "react";
import Select from "react-select";
import './UpdateQAQuiz.scss';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCreate, MdSaveAlt } from "react-icons/md";
import { FaRegLightbulb, FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import {
    getAllQuizForAdminService,
    getQuizWithQA, postUpsertQA
} from "../../../../services/apiService";
import { useImmer } from "use-immer";

const UpdateQAQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([]);
    const [isViewImage, setIsViewImage] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState('');

    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            previewImage: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]
    const [questions, setQuestions] = useImmer(initQuestion)

    const fectchQuiz = async () => {
        let res = await getAllQuizForAdminService();
        if (res && res.EC === 0) {
            let modifyQuizForSelect = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(modifyQuizForSelect)
        }
    }

    const [dataImagePreview, setDataImagePreview] = useState(
        {
            title: '',
            url: '',
        }
    )

    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    useEffect(() => {
        fectchQuiz();
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }

    }, [selectedQuiz])

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            //convert imageBase64 to file object
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let question = res.DT.qa[i];
                if (question.imageFile) {
                    question.imageFile = await urltoFile(`data:image/png;base64,${question.imageFile}`, `Question_${question.id}.png`, 'image/png');
                    question.previewImage = URL.createObjectURL(question.imageFile)
                }

                newQA.push(question)
            }

            setQuestions(newQA);
        }
    }

    const handleAddOrRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                previewImage: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }

            setQuestions([newQuestion, ...questions]);
        }

        if (type === 'REMOVE') {
            let newListQuestion = questions.filter(item => item.id !== id);
            setQuestions(newListQuestion);
        }
    }

    const handleAddOrRemoveAnswer = (type, qId, aId) => {
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            setQuestions((draft) => {
                let index = draft.findIndex(item => item.id === qId);
                draft[index].answers.push(newAnswer)
            })
        }

        if (type === 'REMOVE') {
            setQuestions((draft) => {
                let index = draft.findIndex(item => item.id === qId);
                draft[index].answers =
                    questions[index].answers.filter(item => item.id !== aId);
            })
        }

    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            setQuestions((draft) => {
                let index = draft.findIndex(item => item.id === questionId);
                if (index > -1) {
                    draft[index].description = value;
                }
            })
        }
    }

    const handleOnChangeAnswer = (type, questionId, answerId, value) => {
        setQuestions((draft) => {
            let index = draft.findIndex(item => item.id === questionId);
            if (index > -1) {
                draft[index].answers =
                    draft[index].answers.map(answer => {
                        if (answer.id === answerId) {
                            if (type === 'CHECKBOX') {
                                answer.isCorrect = value;
                            }

                            if (type === 'INPUT') {
                                answer.description = value;
                            }
                        }

                        return answer;
                    })
            }
        })
    }

    const handleOnChangFileQuestion = (questionId, event) => {
        setQuestions((draft) => {
            let index = draft.findIndex(item => item.id === questionId);
            if (index > -1 && event.target && event.target.files && event.target.files[0]) {
                draft[index].imageFile = event.target.files[0];
                draft[index].imageName = event.target.files[0].name;
                draft[index].previewImage = URL.createObjectURL(event.target.files[0]);
            }
        })
    }

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })

            setIsViewImage(true)
        }
    }

    const handleSubmitSaveQuiz = async () => {
        //validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please Choose A Quiz!!!")
            return
        }

        //validate question
        let isValidQuestion = true;
        let indexQuestion = '';
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQuestion = i
                break
            }
        }

        if (isValidQuestion === false) {
            toast.error(`Question ${indexQuestion + 1} is Empty!!!`)
            return
        }

        //validate anwser
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;

        for (let i = 0; i < questions.length; i++) {
            let countCheckbox = 0;
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false
                    indexA = j
                    break;
                }

                if (questions[i].answers[j].isCorrect === true) {
                    countCheckbox = countCheckbox + 1;
                }
            }

            if (isValidAnswer === false) {
                indexQ = i
                break;
            }

            if (countCheckbox === 0) {
                indexQ = i
                toast.error(`Question ${indexQ + 1} should have one answer Right!!!`)
                return;
            }
        }

        if (isValidAnswer === false) {
            toast.error(`Answer ${indexA + 1} at Question ${indexQ + 1} is Empty!!!`)
            return;
        }

        //create question
        let questionClone = _.cloneDeep(questions);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
            }
        }

        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });

        if (res && res.EC === 0) {
            toast.success("Update Question Succeed!!!");
            fetchQuizWithQA();
        }
    }

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className="head-control">
                    <div className="col-6 form-group">
                        <Select
                            options={listQuiz}
                            placeholder={"Select Quiz"}
                            defaultValue={selectedQuiz}
                            onChange={setSelectedQuiz}
                        />
                    </div>

                    <div className="btn-add-new">
                        <button
                            onClick={() => handleAddOrRemoveQuestion('ADD', '')}
                        >Thêm Câu Hỏi <MdOutlineCreate /></button>
                    </div>

                    <div className="btn-save">
                        <button
                            onClick={() => handleSubmitSaveQuiz()}
                        >LƯU THAY ĐỔI <MdSaveAlt className="btn-save-icon" /></button>
                    </div>
                </div>

                {questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="each-question">
                                <fieldset className="border border-2 border-dark rounded-3 p-3">
                                    <legend className="float-none w-auto px-3">Question: {index + 1}</legend>

                                    <div className="question-content">
                                        <div className="question-answer">
                                            <div className="form-floating mb-3 question">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Name'
                                                    value={question.description}
                                                    onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                                />
                                                <label>Question</label>
                                            </div>

                                            <span>Answer</span>
                                            {question.answers && question.answers.length > 0 &&
                                                question.answers.map((answer, index) => {
                                                    return (
                                                        <div key={answer.id} className="answer">
                                                            <input
                                                                type="checkbox"
                                                                className="check-right-answer"
                                                                checked={answer.isCorrect}
                                                                onChange={(event) => handleOnChangeAnswer('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                            ></input>
                                                            <div className="form-floating answer-child">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder='Name'
                                                                    value={answer.description}
                                                                    onChange={(event) => handleOnChangeAnswer('INPUT', question.id, answer.id, event.target.value)}
                                                                />
                                                                <label>Answer {index + 1}</label>
                                                            </div>
                                                            {question.answers.length > 1 &&
                                                                <span
                                                                    onClick={() => handleAddOrRemoveAnswer('REMOVE', question.id, answer.id)}
                                                                >
                                                                    <FaRegTrashAlt className="btn-delete-answer" />
                                                                </span>
                                                            }

                                                        </div>
                                                    )
                                                })
                                            }

                                            <div className="btn-add-answer">
                                                <button
                                                    onClick={() => handleAddOrRemoveAnswer('ADD', question.id, '')}
                                                >Thêm Câu Trả Lời <FaRegLightbulb /> </button>
                                            </div>
                                        </div>

                                        <div className='more-action'>
                                            <div className="upload-image">
                                                <label
                                                    style={{ margin: "auto 0" }}
                                                    className="form-label"
                                                >
                                                    Upload Image <IoCloudUploadOutline />
                                                </label>
                                                <input
                                                    className='form-control my-2'
                                                    type='file'
                                                    onChange={(event) => handleOnChangFileQuestion(question.id, event)}

                                                ></input>

                                                <div className="img-preview">
                                                    {question.previewImage ?
                                                        <img
                                                            alt=""
                                                            onClick={() => handlePreviewImage(question.id)}
                                                            src={question.previewImage} />
                                                        :
                                                        <span>Preview Image</span>
                                                    }
                                                </div>
                                            </div>

                                            {questions.length > 1 &&
                                                <div className="btn-delete-question">
                                                    <button
                                                        onClick={() => handleAddOrRemoveQuestion('REMOVE', question.id)}
                                                    >
                                                        Xóa Câu Hỏi <FaRegTrashAlt /></button>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        )
                    })
                }
            </div>

            {isViewImage === true &&
                <Lightbox
                    image={dataImagePreview.url}
                    title={dataImagePreview.title}
                    onClose={() => setIsViewImage(false)}
                >
                </Lightbox>
            }

        </div>
    )
}

export default UpdateQAQuiz;