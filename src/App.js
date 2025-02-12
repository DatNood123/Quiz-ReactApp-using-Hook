import './App.scss';
import Header from './components/Navigation/Header';
import { Outlet } from 'react-router-dom';
import PerfectScrollBar from 'react-perfect-scrollbar';

const App = () => {

  return (
    <div className="app-container">
      <PerfectScrollBar>
        <div className='header-container'>
          <Header />
        </div>

        <div className='main-container'>
          <div className='app-content'>
            <Outlet />
          </div>
        </div>
      </PerfectScrollBar>
    </div>
  );
}

export default App;
