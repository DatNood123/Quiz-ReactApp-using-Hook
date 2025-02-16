import { useEffect, useState } from "react";
import { getDataHistoryDoQuiz } from "../../services/apiService";

const HistoryComponent = () => {
    const [dataHistory, setDataHistory] = useState([]);

    const fetchDataHistory = async () => {
        let res = await getDataHistoryDoQuiz();
        if (res && res.EC === 0) {
            getLast7DataItems(res.DT.data)
        }
    }

    useEffect(() => {
        fetchDataHistory();
    }, [])

    const getLast7DataItems = (data) => {
        let sortedData = [...data].sort((a, b) => b.id - a.id);
        let last7Items = sortedData.slice(0, 7);

        setDataHistory(last7Items);
    };

    function formatCreatedAt(createdAt) {
        const date = new Date(createdAt);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    }

    return (
        <div className="history-container">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                        <th scope="col">Quiz Name</th>
                        <th scope="col">Total Question</th>
                        <th scope="col">Total Correct</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>

                <tbody>
                    {dataHistory && dataHistory.length > 0 &&
                        dataHistory.map((item, index) => {
                            return (
                                <tr key={index} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                    <td>{item.quizHistory?.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{formatCreatedAt(item.createdAt)}</td>
                                </tr>
                            )
                        })
                    }

                    {dataHistory && dataHistory.length === 0 &&
                        <tr>
                            <td colSpan={'5'} style={{ textAlign: 'center' }}>No data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default HistoryComponent;