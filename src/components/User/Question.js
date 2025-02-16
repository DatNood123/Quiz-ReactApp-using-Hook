import React, { useState } from 'react';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import { TiTick } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";


const Question = (props) => {
    const { data, index, isFinish, isShowAnswer } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false)

    const handleChangeCheckbox = (qId, aId) => {
        props.handleCheckbox(qId, aId)
    }

    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    return (
        <>
            {data.image ?
                <div className='question-image'>
                    <img
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${data.image}`}
                        alt="Question" />
                    {isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}
                        >

                        </Lightbox>
                    }
                </div>
                :
                <div className='question-image'>

                </div>
            }

            <div className='question'>Question {index + 1}: {data.questionDescription}</div>
            <div className='answer' style={isFinish ? { pointerEvents: "none" } : { pointerEvents: "auto" }}>
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((item, index) => {
                        const isCheck = item.isSelected;
                        return (
                            <div
                                key={index}
                                className='question-child'
                                style={
                                    isCheck ? { backgroundColor: "#65eef7" } : { backgroundColor: "transparent" }
                                }
                                onClick={() => handleChangeCheckbox(data.questionId, item.id)}
                            >
                                <div className='form-check'>
                                    <input
                                        className='form-check-input'
                                        type='checkbox'
                                        hidden
                                    />
                                    <label className='form-check-label'>
                                        {String.fromCharCode(65 + index)}. {item.description}
                                    </label>
                                </div>

                                {isShowAnswer && isFinish && item.isCorrect && <TiTick className='correct' />}
                                {isShowAnswer && isFinish && item.isCorrect === false && <FaTimes className='incorrect' />}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;