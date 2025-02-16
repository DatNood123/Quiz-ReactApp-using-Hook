import { useEffect, useState } from "react";
import { useRef } from "react";

const QuestionOverview = (props) => {
    const { dataQuiz, handleFinishQuiz, isFinish, setIndex } = props;
    const [count, setCount] = useState(-1);
    const refDiv = useRef([])

    useEffect(() => {
        if (dataQuiz && dataQuiz.length > 0 && count === -1) {
            setCount(dataQuiz.length * 5);
        }
    }, [dataQuiz]);

    const onTimeUp = () => {
        handleFinishQuiz();
    }

    useEffect(() => {
        if (isFinish === true) {
            setCount(0)
        }

        if (count === 0 && isFinish === false) {
            onTimeUp();
            return
        }

        const timer = setTimeout(() => {
            setCount(count - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [count]);

    const secondsToTime = (seconds) => {
        const sec_num = parseInt(seconds, 10);
        const hours = Math.floor(sec_num / 3600);
        const mins = Math.floor((sec_num % 3600) / 60);
        const secs = sec_num % 60;

        return [hours, mins, secs]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    const getClassQuestion = (question) => {
        //check answered
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return "each-question selected"
            }
        }

        return "each-question"
    }

    const handleClickQuestion = (index) => {
        setIndex(index);

        if (refDiv.current) {
            refDiv.current.forEach((divItem, divIndex) => {
                //reset về unclick
                if (divItem && divItem.className === "each-question clicked") {
                    divItem.className = "each-question"
                }

                //sau khi reset nếu có question nào đã trả lời thì đặt lại Selected
                if (dataQuiz && dataQuiz[divIndex]) {
                    let isAnswered = dataQuiz[divIndex].answers.find(a => a.isSelected === true);
                    if (isAnswered) {
                        divItem.className = "each-question selected"
                    }
                }
            })
        }

        refDiv.current[index].className = "each-question clicked"
    }

    return (
        <div className="qa-overview-container">
            <div className="header">
                {count > 0 ? secondsToTime(count) : 'Finish'}
            </div>

            <div className="all-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                ref={element => refDiv.current[index] = element}
                                key={index}
                                className={getClassQuestion(item)}
                                onClick={() => handleClickQuestion(index)}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default QuestionOverview;