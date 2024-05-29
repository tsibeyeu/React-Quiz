/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const NextButton = ({dispatch, selectedAnswer,index,numQuestions}) => {
  if (selectedAnswer === null) return null;
  if(index <numQuestions-1)
  return (
    <button
      onClick={() => dispatch({ type: "nextQuestion" })}
      className="btn btn-ui"
    >
      Next
    </button>
  );
  if(index === numQuestions-1)
  return (
    <button
      onClick={() => dispatch({ type: "finish" })}
      className="btn btn-ui"
    >
      see result
    </button>
  );
 
};

export default NextButton;
