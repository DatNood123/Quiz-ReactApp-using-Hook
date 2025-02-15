import './Dashboard.scss';
import {
    BarChart, XAxis,
    YAxis, Tooltip,
    Legend, Bar, ResponsiveContainer
} from 'recharts';
import { getOverview } from '../../../../services/apiService';
import { useEffect, useState } from 'react';

const Dashboard = (props) => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            let Quiz = 0, User = 0, Question = 0, Answer = 0;
            Quiz = res?.DT?.others?.countQuiz ?? 0;
            User = res?.DT?.users?.total ?? 0;
            Question = res?.DT?.others?.countQuestions ?? 0;
            Answer = res?.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    "name": "Chart",
                    "Quiz": Quiz,
                    "User": User,
                    "Question": Question,
                    "Answer": Answer,
                }
            ]

            setDataChart(data);
        }
    }

    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics Dashboard
            </div>

            <div className='content'>
                <div className='content-left'>
                    <div className='child'>
                        <div className='border-child'>
                            <span className='child-title'>Total Account</span>
                            <span className='child-number'>
                                {dataOverview && dataOverview.users?.total ?
                                    dataOverview.users.total : 0
                                }
                            </span>
                            <div className='child-detail'>
                                <span>Admin: &nbsp;
                                    <b>
                                        {dataOverview && dataOverview.users?.countAdmin ?
                                            dataOverview.users.countAdmin : 0}
                                    </b>
                                </span>
                                <span>Users: &nbsp;
                                    <b>
                                        {dataOverview && dataOverview.users?.countUsers ?
                                            dataOverview.users.countUsers : 0}
                                    </b>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='child'>
                        <div className='border-child'>
                            <span className='child-title'>Total Quiz</span>
                            <span className='child-number'>
                                {dataOverview && dataOverview.others?.countQuiz ?
                                    dataOverview.others.countQuiz : 0
                                }
                            </span>
                        </div>
                    </div>

                    <div className='child'>
                        <div className='border-child'>
                            <span className='child-title'> Total Question</span>
                            <span className='child-number'>
                                {dataOverview && dataOverview.others?.countQuestions ?
                                    dataOverview.others.countQuestions : 0
                                }
                            </span>
                        </div>
                    </div>

                    <div className='child'>
                        <div className='border-child'>
                            <span className='child-title'> Total Answer</span>
                            <span className='child-number'>
                                {dataOverview && dataOverview.others?.countAnswers ?
                                    dataOverview.others.countAnswers : 0
                                }
                            </span>
                        </div>
                    </div>
                </div>

                <div className='content-right'>
                    <div className='chart'>
                        <ResponsiveContainer width={"100%"} height={"70%"}  >
                            <BarChart data={dataChart} barGap={40}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="User" fill="#EA4335" barSize={80} />
                                <Bar dataKey="Quiz" fill="#4285F4" barSize={80} />
                                <Bar dataKey="Question" fill="#FBBC05" barSize={80} />
                                <Bar dataKey="Answer" fill="#34A853" barSize={80} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;