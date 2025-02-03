import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';

const App = () => {

  return (
    <div className="App">
      Hello world
    </div>
  );
}

export default App;
