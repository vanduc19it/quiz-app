import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Question from './question';
import { Modal, Spin } from 'antd';
import '../quiz.css';

const Quiz = () => {

  const [quiz, setQuiz] = useState([])
  const [playAgain,setPlayAgain] = useState(0)

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timePlay, setTimePlay] = useState(0);

  const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0)

  const getQuiz = async () => {
        try {
          const res = await axios.get('https://opentdb.com/api.php?amount=5');
          const quiz = res.data.results;
          setQuiz(quiz)
          console.log(quiz)
          setStartTime(Date.now());
          
        } catch (error) {
          console.error('get quiz error:', error);
        }
      };
      
      useEffect(()=> {
        getQuiz();
    },[playAgain])
  

    const [result, setResult] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(false);
    

    const  handleAnswerSelect = (selectedAnswer) => {
       
        console.log(selectedAnswer)
        console.log(quiz[currentQuestionIndex].correct_answer)
        if(selectedAnswer == quiz[currentQuestionIndex].correct_answer) {
          setResult(result + 1)
        }
        if (selectedAnswer) {
          setSelectedAnswer(true)
        }
      };
    
    const [stop,setStop] = useState(false)

      const goToNextQuestion = () => {
        
        if (selectedAnswer) {
          if (currentQuestionIndex < quiz.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1 )
            setSelectedAnswer(false)
        } else {
          setStop(true)   
        }
        } else {      
          alert('Vui lòng chọn đáp án!');
        }
       
      };
    
      const [isModalOpen, setIsModalOpen] = useState(false);
      const handleResult = ()=> {
          setEndTime(Date.now());
          setIsModalOpen(true);    
      }

      useEffect(() => {
        if (endTime && startTime) {
          const timePlayed = (endTime - startTime) / 1000;
          setTimePlay(Math.floor(timePlayed));
        }
      }, [endTime, startTime]);

     
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePlayAgain = () => {
    setPlayAgain(playAgain + 1)
    setIsModalOpen(false);
    setCurrentQuestionIndex(0);
    setResult(0);
    setStop(false)
  }

  return (
    <>
      <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={null}>
        <div className='modal'>

        <img src="/firework.png" alt="" className='img_modal'/>
        <h2>Congratulation!</h2>
        <h3>{`${result}/${quiz.length} correct anwsers in ${timePlay} seconds.`}</h3>
        
        <button onClick={handlePlayAgain} className='btn'>Play again</button>

        </div>
       
      </Modal>
      <div>
    {
      quiz.length !=0 ? (
        <div className='question'>
        <h2>{`Question ${currentQuestionIndex + 1}/${quiz.length}`}</h2>
        <Question
                quiz={quiz[currentQuestionIndex]}
                onSelectAnswer={handleAnswerSelect}
              />
              {
                  !stop  ? <button type="button" className="btn" onClick={goToNextQuestion}>Next</button> :  <button  type="button" className="btn" onClick={handleResult}>Finish</button>
              }
        </div>
        
      ) : (
        <div className='spin'>
            <Spin tip="Loading" size="large">
            </Spin>
        </div>
        
      )
    }
  </div>
    </>
  
  )
}

export default Quiz