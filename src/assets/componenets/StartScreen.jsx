/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// import React from "react";

const StartScreen = ({numQuestions, dispatch}) => {
  return (
    <div className="start">
      <h2>wellcome to react quize</h2>
      <h3>{numQuestions} question to test React Mastery</h3>
      <button className="btn btn-ui" onClick={ ()=>dispatch({type:"active"})}>let's start</button>
    </div>
  );
};

export default StartScreen;
