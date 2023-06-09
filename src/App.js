import { useState } from 'react';
import './App.css';
import Quiz from './components/quiz';

function App() {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };

  return (
    <div className="app">

      {!start ? (
        <div className='container'>
          <img src="/answer.png" alt="quiz_logo" className='logo' />
          <button onClick={handleStart} className='btn-start'>Start Quiz!</button>
        </div>
      ) : (
        <Quiz />
      )}

    </div>
  );
}

export default App;
