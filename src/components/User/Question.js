import React, { useState } from 'react';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';

const Question = (props) => {
    const { data, index } = props;
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

            <div className='question'>Question {index + 1}: {data.questionDescription}?</div>
            <div className='answer'>
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((item, index) => {
                        const isCheck = item.isSelected;
                        return (
                            <div
                                key={index}
                                className='question-child'
                                style={isCheck === true ? { backgroundColor: "#65eef7" } : { backgroundColor: "transparent" }}
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
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;