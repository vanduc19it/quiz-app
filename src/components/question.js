import React, { useEffect, useState } from 'react';
import '../question.css';
const Question = ({ quiz, onSelectAnswer }) => {
  const handleSelectAnswer = (option) => {
    onSelectAnswer(option);
  };

  const [allAnswers, setAllAnswers] = useState([]);

  const handleAnswers = () => {
    if (quiz) {
        setAllAnswers([quiz.correct_answer, ...quiz.incorrect_answers].sort(() => Math.random() - 0.5))
    }
  };

  useEffect(() => {
    handleAnswers();
  }, [quiz]);


  return (
    <div className='question1'>
    <h2>{quiz?.question}</h2>
    {allAnswers.map((option) => (
      <div key={option} className='answer' >
        <label htmlFor={`option-${option}`}>
          <input
            type="radio"
            name="answer"
            value={option}
            onClick={() => handleSelectAnswer(option)}
            
          />
          {option}
        </label>
      </div>
    ))}
  </div>
  );
};

export default Question;
