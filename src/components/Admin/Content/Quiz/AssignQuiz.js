import Select from "react-select";
import './AssignQuiz.scss';
import { useEffect, useState } from "react";
import { getAllQuizForAdminService, getAllUserService, postAssignQuizToUser } from "../../../../services/apiService";
import { toast } from "react-toastify";

const AssignQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    const fectchQuiz = async () => {
        let res = await getAllQuizForAdminService();
        if (res && res.EC === 0) {
            let modifyQuizForSelect = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(modifyQuizForSelect)
        }
    }

    const fectchUser = async () => {
        let res = await getAllUserService();
        if (res && res.EC === 0) {
            let modifyUserForSelect = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(modifyUserForSelect)
        }
    }

    useEffect(() => {
        fectchQuiz();
        fectchUser();
    }, [])

    const handleAssign = async () => {
        let res = await postAssignQuizToUser(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success("Assign Succeed")
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="assign-quiz-container">
            <div className="assign-quiz-content">
                <div className="list-quizzes">
                    <div className="text-title">LIST QUIZ</div>
                    <Select
                        placeholder={"Select Quiz"}
                        options={listQuiz}
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                    />
                </div>

                <div className="list-users">
                    <div className="text-title">LIST USER</div>
                    <Select
                        placeholder={"Select User"}
                        options={listUser}
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                    />
                </div>
            </div>

            <div className="btn-assign">
                <button
                    onClick={() => handleAssign()}
                >ASSIGN</button>
            </div>
        </div>
    )
}

export default AssignQuiz;