import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuizService, postSubmitQuizService } from "../../services/apiService";
import './DetailQuiz.scss';
import _ from 'lodash';
import Question from "./Question";
import ModalConfirmSubmit from "./ModalConfirmSubmit";
import ModalResult from "./ModalResult";
import QuestionOverview from "./QuestionOverview";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const DetailQuiz = (props) => {
    const [isFinish, setIsFinish] = useState(false)
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataResultModal, setDataModalResult] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isShowAnswer, setIsShowAnswer] = useState(false);

    useEffect(() => {
        fetchQuestion();
    }, [quizId])

    const fetchQuestion = async () => {
        const res = await getDataQuizService(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy('id')
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isCorrect = false;
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })

                    answers = _.orderBy(answers, ['id', 'asc']);

                    return { questionId: key, answers, questionDescription, image }
                })
                .value();

            setDataQuiz(data);
        }
    }

    const handleCheckbox = (questionId, answerId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item
            })
        }

        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) {
            return
        }

        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1)
        }
    }

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };

        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })

            payload.answers = answers;
        }

        let res = await postSubmitQuizService(payload);

        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })

            getRightAnwsers(res.DT.quizData);
            setIsShowModalResult(true);
            setIsFinish(true)
        }
    }

    const getRightAnwsers = (dataRight) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        if (dataQuiz && dataRight) {
            for (let i = 0; i < dataQuizClone.length; i++) {
                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                    if (dataQuizClone[i] && dataQuizClone[i].answers[j] && dataRight[i].systemAnswers) {
                        if (dataQuizClone[i].answers[j].id == dataRight[i].systemAnswers[0].id) {
                            dataQuizClone[i].answers[j].isCorrect = true;
                        }
                    }
                }
            }
        }

        setDataQuiz(dataQuizClone)
    }

    return (
        <div className="detail-quiz-container">
            <div className="navigate">
                <Breadcrumb>
                    <Breadcrumb.Item
                        onClick={() => navigate('/')}
                    >
                        {t('header.homepage')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        onClick={() => navigate('/users')}
                    >
                        {t('header.quiz')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{location?.state?.quizTitle}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="content">
                <div className="content-left">
                    <div className="quiz-title">
                        Quiz: {location?.state?.quizTitle}
                    </div>
                    <hr></hr>

                    <div className="quiz-content">
                        <Question
                            isShowAnswer={isShowAnswer}
                            isFinish={isFinish}
                            handleCheckbox={handleCheckbox}
                            index={index}
                            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                    </div>

                    <div className="footer">
                        <button
                            disabled={index === 0}
                            onClick={() => handlePrev()}
                            className="btn btn-warning">PREV</button>
                        <button
                            disabled={index === dataQuiz.length - 1}
                            onClick={() => handleNext()}
                            className="btn btn-success">NEXT</button>
                        <button
                            disabled={isFinish}
                            onClick={() => setIsShowConfirmModal(true)}
                            className="btn btn-danger">FINISH</button>
                    </div>
                </div>

                <div className="content-right">
                    <QuestionOverview
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        isFinish={isFinish}
                        setIndex={setIndex}
                    />
                </div>
            </div>

            <ModalConfirmSubmit
                isShowConfirmModal={isShowConfirmModal}
                setIsShowConfirmModal={setIsShowConfirmModal}
                handleFinishQuiz={handleFinishQuiz}
            />

            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataResultModal={dataResultModal}
                setIsShowAnswer={setIsShowAnswer}
            />
        </div>
    )
}

export default DetailQuiz;