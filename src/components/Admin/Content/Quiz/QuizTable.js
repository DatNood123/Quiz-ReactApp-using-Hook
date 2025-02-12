import { useEffect, useState } from "react";
import { getAllQuizForAdminService } from "../../../../services/apiService";
import ModalEditQuiz from "./ModalEditQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const QuizTable = (props) => {
    const [listQuizz, setListQuizz] = useState([]);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [dataEdit, setDataEdit] = useState('');
    const [dataDelete, setDataDelete] = useState('');

    const fectchQuiz = async () => {
        let res = await getAllQuizForAdminService();
        if (res && res.EC === 0) {
            setListQuizz(res.DT)
        }
    }

    useEffect(() => {
        fectchQuiz()
    }, [props.refreshListQuiz])

    const handelEditQuiz = (quiz) => {
        setIsShowEditModal(true);
        setDataEdit(quiz);
    }

    const handelDeleteQuiz = (quiz) => {
        setIsShowDeleteModal(true);
        setDataDelete(quiz)
    }

    return (
        <>
            <table className="table table-hover table-bordered mt-3">
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Level</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizz && listQuizz.length > 0 &&
                        listQuizz.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th style={{ textAlign: "center" }}>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td style={{ textAlign: "center" }}>{item.difficulty}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handelEditQuiz(item)}
                                        >Edit</button>
                                        <button
                                            onClick={() => handelDeleteQuiz(item)}
                                            className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <ModalEditQuiz
                show={isShowEditModal}
                setShow={setIsShowEditModal}
                dataEdit={dataEdit}
                fectchQuiz={fectchQuiz}
            />

            <ModalDeleteQuiz
                show={isShowDeleteModal}
                setShow={setIsShowDeleteModal}
                dataDelete={dataDelete}
                fectchQuiz={fectchQuiz}
            />
        </>
    )
}

export default QuizTable;