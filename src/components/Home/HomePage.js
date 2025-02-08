import videoHomepage from '../../assets/videoBackground.mp4';
import './HomePage.scss';
import { useSelector } from 'react-redux';

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.userAccount.isAuthenticated);
    const account = useSelector(state => state.userAccount.account);
    return (
        <>
            <div className="homepage-container">
                <div className='heropage'>
                    <video autoPlay muted loop>
                        <source
                            src={videoHomepage}
                            type='video/mp4'>
                        </source>
                    </video>
                </div>

                <div className='homepage-content'>
                    <div className='title-content'>
                        Think you're smart? <br></br>
                        Prove it... or guess again!
                    </div>

                    <div className='subtitle-content'>
                        Dive into our ultimate quiz challenge
                        where only the sharpest minds survive!
                        Think fast, choose wisely, and see if you have what
                        it takes to outsmart the game. Are you a genius or just lucky?
                    </div>

                    <div className='btn-content'>
                        <button>
                            Let's find out!
                        </button>
                    </div>
                </div>
            </div>

            <div className='box'>

            </div>
        </>
    )
}

export default HomePage;