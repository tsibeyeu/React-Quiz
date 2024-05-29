/* eslint-disable no-case-declarations */
import { useEffect } from "react";
import Header from "./assets/componenets/Header";
import Main from "./assets/componenets/Main";
import Loader from "./assets/componenets/Loader";
import Error from "./assets/componenets/Error";
import Questions from "./assets/componenets/Questions";
import { useReducer } from "react";
import NextButton from "./assets/componenets/NextButton";
import StartScreen from "./assets/componenets/StartScreen";
import Progress from "./assets/componenets/Progress";
import FinishScreen from "./assets/componenets/FinishScreen";
import Footer from "./assets/componenets/Footer";
import Timer from "./assets/componenets/Timer";
const SECS_PER_QUESTION=30;
const intialState = {
  questions: [],
  status: "loading",
  index: 0,
  selectedAnswer: null,
  points: 0,
  highscore: 0,
  setTime: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active",setTime:state.questions.length * SECS_PER_QUESTION };
    case "selectedAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        selectedAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, selectedAnswer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        index: 0,
        highscore: 0,
        selectedAnswer: null,
        points: 0,
        status: "ready",
        
      };
    case "tick":
      return {
        ...state,
        setTime: state.setTime - 1,
        status: state.setTime === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Invalid action");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const {
    questions,
    status,
    index,
    selectedAnswer,
    points,
    highscore,
    setTime,
  } = state;
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:7000/questions")
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              selectedAnswer={selectedAnswer}
            />
            <Questions
              Question={questions[index]}
              selectedAnswer={selectedAnswer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer setTime={setTime} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                selectedAnswer={selectedAnswer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
