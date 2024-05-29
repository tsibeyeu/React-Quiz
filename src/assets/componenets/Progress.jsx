/* eslint-disable react/prop-types */

const Progress = ({ index, numQuestions,points,totalPoints,selectedAnswer }) => {
  return (
    <header className="progress">

    <progress max={numQuestions} value={index + Number(selectedAnswer !== null)}/>
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>Points <strong>{points}</strong>/{totalPoints}</p>
    </header>
  );
};

export default Progress;
