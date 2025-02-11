import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuizService } from "../../services/apiService";
import './DetailQuiz.scss';
import _ from 'lodash';
import Question from "./Question";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

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
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value();

            setDataQuiz(data)
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

    const handleFinishQuiz = () => {
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
            console.log("Payload: ", payload)
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="content-left">
                <div className="quiz-title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr></hr>

                <div className="quiz-content">
                    <Question
                        handleCheckbox={handleCheckbox}
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>

                <div className="footer">
                    <button
                        onClick={() => handlePrev()}
                        className="btn btn-secondary">PREV</button>
                    <button
                        onClick={() => handleNext()}
                        className="btn btn-primary">NEXT</button>
                    <button
                        onClick={() => handleFinishQuiz()}
                        className="btn btn-warning">FINISH</button>
                </div>
            </div>

            <div className="content-right">
                Bảng điểm
            </div>
        </div>
    )
}

export default DetailQuiz;