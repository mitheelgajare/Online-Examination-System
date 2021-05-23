import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import HomePageNav from "./HomePageNav";
import { Link } from "react-router-dom";
import axios from "axios";

const Exam = ({ select, membership }) => {
  const history = useHistory();
  const [questionPapers, setQuestionPapers] = useState([]);
  const [currentQuestionPaper, setCurrentQuestionPaper] = useState(null);
  const [currentQuestionPaperQuestion, setCurrentQuestionPaperQuestion] =
    useState(null);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/getActiveQuestionPapers")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setQuestionPapers(data);
      });
  }, []);

  const callQuestionPaper = questionPaper => {
    setCurrentQuestionPaper(questionPaper);
    fetch(
      `http://localhost:5000/getQuestionPaperDetails?id=${questionPaper.id}`
    )
      .then(res => res.json())
      .then(data => {
        setCurrentQuestionPaperQuestion(data);
        data.forEach(question => {
          setTotalMarks(totalMarks + parseInt(question.marks));
        });
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const radioButtons = document.querySelectorAll(".radio");
    radioButtons.forEach(rb => {
      if (rb.checked) {
        console.log(rb.name);
        console.log(rb.value);
      }
    });
  };

  if (select === "student" || membership === "false") {
    history.push("/login");
    return null;
  }

  return (
    <div className="all-question-papers-page">
      <HomePageNav select={select} />
      <div className="ctl">Click the link to attempt the examination</div>
      <ol>
        {questionPapers.map(questionPaper => (
          <li>
            <Link
              className="test-link"
              onClick={() => callQuestionPaper(questionPaper)}
            >
              {questionPaper.name}
            </Link>
          </li>
        ))}
      </ol>

      {currentQuestionPaperQuestion && (
        <p className="pop-up">
          <p className="title">{currentQuestionPaper.name}</p>
          <p className="title-2">Subject : {currentQuestionPaper.subject}</p>
          <div className="total-marks">Total Marks: {totalMarks}</div>
          <hr />
          <ol type="1" className="ol">
            {currentQuestionPaperQuestion.map(question => (
              <div className="mega-question">
                <li>{question.question}</li>
                {question.options_arr.map(option => (
                  <div className="option">
                    <input
                      type="radio"
                      className="radio"
                      name={question.id}
                      value={option}
                    />
                    {option}
                  </div>
                ))}
              </div>
            ))}
          </ol>

          <button className="activate" onClick={handleSubmit}>
            Submit
          </button>
        </p>
      )}
    </div>
  );
};

export default Exam;
