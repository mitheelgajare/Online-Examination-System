import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const AllQuestions = () => {
  let questions = fetch("http://localhost:5000/getQuestions").then(json => {
    console.log(json);
    return JSON.parse(json);
  });

  return (
    <div>
      <button>Click Me!</button>
      {questions.map(question => {
        return <div>{question.question}</div>;
      })}
    </div>
  );
};

export default AllQuestions;
