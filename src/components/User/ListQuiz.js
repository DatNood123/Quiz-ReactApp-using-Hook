import { useEffect, useState } from "react";
import { getListQuizByUserService } from "../../services/apiService";
import './ListQuiz.scss';
import { useNavigate } from "react-router-dom";
import PageTransition from "../../routes/PageTransition";
import { useTranslation } from 'react-i18next';

const ListQuiz = (props) => {
    const [arrayQuiz, setArrayQuiz] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        getQuizData();
    }, [])

    const navigate = useNavigate();

    const getQuizData = async () => {
        const res = await getListQuizByUserService();
        if (res && res.EC === 0) {
            setArrayQuiz(res.DT)
        }
    }

    return (
        <PageTransition key={1}>
            <div className="list-quiz-container">
                {arrayQuiz && arrayQuiz.length > 0 &&
                    arrayQuiz.map((item, index) => {
                        return (
                            <div key={index} className="card" style={{ width: "18rem" }}>
                                <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{t('quiz.quiz')} {index + 1}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })}
                                    >{t('quiz.start')}</button>
                                </div>
                            </div>
                        )
                    })
                }

                {arrayQuiz && arrayQuiz.length === 0 &&
                    <div style={{ color: "white", textTransform: "uppercase" }}>{t('quiz.noQuiz')}</div>
                }

            </div>
        </PageTransition>
    )
}

export default ListQuiz;