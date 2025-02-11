import { useEffect, useState } from "react";
import { getListQuizByUserService } from "../../services/apiService";
import './ListQuiz.scss';
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
    const [arrayQuiz, setArrayQuiz] = useState([]);

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
        <div className="list-quiz-container">
            {arrayQuiz && arrayQuiz.length > 0 &&
                arrayQuiz.map((item, index) => {
                    return (
                        <div key={index} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })}
                                >Start Now</button>
                            </div>
                        </div>
                    )
                })
            }

            {arrayQuiz && arrayQuiz.length === 0 &&
                <div style={{ color: "white", textTransform: "uppercase" }}>You don't have any quiz now</div>
            }

        </div>
    )
}

export default ListQuiz;