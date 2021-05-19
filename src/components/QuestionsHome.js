import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const QuestionHome = ({ select, membership }) => {
  const history = useHistory();

  if (select === "student" || membership === "false") {
    history.push("/home");
    return null;
  }
  return (
    <div className="questions-home-page">
      <div>Questions</div>
      <ul>
        <li>
          <Link to="/addQuestion" className="link">
            Add a Question
          </Link>
        </li>
        <li>
          <Link to="/allQuestions" className="link">
            All Questions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default QuestionHome;
