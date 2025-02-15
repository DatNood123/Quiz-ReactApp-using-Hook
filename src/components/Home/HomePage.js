import videoHomepage from '../../assets/videoBackground.mp4';
import './HomePage.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../routes/PageTransition';
import { useTranslation } from 'react-i18next';

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.userAccount.isAuthenticated);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <PageTransition key={0}>
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
                            {t('homepage.title1')} <br></br>
                            {t('homepage.title2')}
                        </div>

                        <div className='subtitle-content'>
                            {t('homepage.title3')}
                        </div>

                        <div className='btn-content'>
                            {isAuthenticated === false ?
                                <button onClick={() => navigate('/login')}>
                                    {t('homepage.started')}
                                </button>
                                :
                                <button onClick={() => navigate('/users')}>
                                    {t('homepage.doQuiz')}
                                </button>
                            }

                        </div>
                    </div>
                </div>
            </PageTransition>
        </>
    )
}

export default HomePage;