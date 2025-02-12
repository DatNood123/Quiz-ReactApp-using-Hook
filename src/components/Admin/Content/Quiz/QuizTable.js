import { useEffect, useState } from "react";
import { getAllQuizForAdminService } from "../../../../services/apiService";

const QuizTable = (props) => {
    const [listQuizz, setListQuizz] = useState([])

    useEffect(() => {
        fectchQuiz();
    }, [])

    const fectchQuiz = async () => {
        let res = await getAllQuizForAdminService();
        if (res && res.EC === 0) {
            setListQuizz(res.DT)
        }
    }

    return (
        <>
            <table class="table table-hover table-bordered mt-3">
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
                                <tr>
                                    <th style={{ textAlign: "center" }}>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td style={{ textAlign: "center" }}>{item.difficulty}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <button className="btn btn-warning">Edit</button>
                                        <button className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default QuizTable;