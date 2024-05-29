/* eslint-disable react/prop-types */
// import React from 'react'

const FinishScreen = ({ totalPoints, points, highscore, dispatch }) => {
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore {highscore} points </p>

      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        restart
      </button>
    </>
  );
};

export default FinishScreen;
