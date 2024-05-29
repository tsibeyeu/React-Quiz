/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import  { useEffect } from "react";

const Timer = ({ dispatch, setTime }) => {
  const mins=Math.floor(setTime / 60);
  const seconds=setTime % 60;
  useEffect(() => {
    const id = setInterval(function ()  {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      console.log("Cleanup function");
      clearInterval(id)};
  }, [dispatch]);
  return <div className="timer">{mins <10 && "0"}{mins}:{seconds <10 && "0"}{seconds}</div>;
};

export default Timer;
