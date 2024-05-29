/* eslint-disable react/prop-types */
// import React from 'react'

const Questions = ({ Question,selectedAnswer,dispatch }) => {
//   console.log(Question);
  const hasAnswered=selectedAnswer !== null;
  return (
    <div>
      <h4>{Question.question}</h4>
      <div className="options">
        {Question.options.map((option,index) => (
          <button disabled={hasAnswered} className={`btn btn-option ${selectedAnswer === index ?"answer":""} ${ hasAnswered?index === Question.correctOption ? "correct":"wrong" :""}`} key={option} onClick={()=>dispatch({type:"selectedAnswer",payload:index})}>{option}</button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
