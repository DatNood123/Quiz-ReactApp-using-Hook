import { useEffect, useState } from "react";
import Select from "react-select";
import './Questions.scss';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCreate, MdSaveAlt } from "react-icons/md";
import { FaRegLightbulb, FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdminService, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from "../../../../services/apiService";

const Questions = (props) => {

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fectchQuiz()
    }, [])

    const fectchQuiz = async () => {
        let res = await getAllQuizForAdminService();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const [isViewImage, setIsViewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState(
        {
            title: '',
            url: '',
        }
    )
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: 'question 1',
                imageFile: '',
                imageName: '',
                previewImage: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

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
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }

    const handleAddOrRemoveAnswer = (type, qId, aId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            let index = questionsClone.findIndex(item => item.id === qId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === qId);
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== aId);

            setQuestions(questionsClone);
        }

    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions);
            let index = questionClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionClone[index].description = value;
                setQuestions(questionClone);
            }

        }
    }

    const handleOnChangeAnswer = (type, questionId, answerId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answer => {
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

        setQuestions(questionClone)
    }

    const handleOnChangFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            questionClone[index].previewImage = URL.createObjectURL(event.target.files[0]);
            setQuestions(questionClone);
        }
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
        // postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion

        //create question
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile,
            );

            //create answer
            await Promise.all(question.answers.map(async (answer) => {
                await postCreateNewAnswerForQuestion(
                    answer.description,
                    answer.isCorrect,
                    q.DT.id
                )
            }))
        }))
    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>

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
                        >LƯU BÀI QUIZ <MdSaveAlt className="btn-save-icon" /></button>
                    </div>
                </div>

                {questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="each-question">
                                <fieldset className="border border-2 border-dark rounded-3 p-3">
                                    <legend className="float-none w-auto px-3">Create New Question: {index + 1}</legend>

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

export default Questions;