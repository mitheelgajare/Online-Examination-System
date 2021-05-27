import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import HomePageNav from "./HomePageNav";
import { Link } from "react-router-dom";
import axios from "axios";

const AllQuestionPapers = ({ select, membership }) => {
  const history = useHistory();
  const [questionPapers, setQuestionPapers] = useState([]);
  const [currentQuestionPaper, setCurrentQuestionPaper] = useState(null);
  const [currentQuestionPaperQuestion, setCurrentQuestionPaperQuestion] =
    useState(null);
  const [activeOrNot, setActiveOrNot] = useState("Activate");
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/getQuestionPapers")
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
        let count = 0;
        for (let question of data) {
          count += parseInt(question.marks);
        }

        setTotalMarks(count);
        setActiveOrNot(questionPaper.isActive ? "Deactivate" : "Activate");
      });
  };

  const activate = () => {
    axios
      .put(
        `http://localhost:5000/activateQuestionPaper?id=${currentQuestionPaper.id}`,
        {}
      )
      .then(res => {
        if (res.status === 200) {
          alert("Successfully updated");
          setActiveOrNot(
            activeOrNot === "Activate" ? "Deactivate" : "Activate"
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const close = () => {
    setCurrentQuestionPaperQuestion(null);
    window.location.reload();
  };

  if (select === "student" || membership === "false") {
    history.push("/login");
    return null;
  }

  return (
    <div className="all-question-papers-page">
      <HomePageNav select={select} />
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
          <button className="close" onClick={close}>
            X
          </button>
          <p className="title">{currentQuestionPaper.name}</p>
          <p className="title-2">Subject : {currentQuestionPaper.subject}</p>
          <div className="total-marks">Total Marks: {totalMarks}</div>
          <hr />
          <ol type="1" className="ol">
            {currentQuestionPaperQuestion.map(question => (
              <div className="mega-question">
                <div className="marks">Marks:{question.marks}</div>
                <li>{question.question}</li>
                {question.options_arr.map(option => (
                  <div className="option">
                    <input type="radio" name={question.id} />
                    {option}
                  </div>
                ))}
              </div>
            ))}
          </ol>

          <button className="activate" onClick={() => activate()}>
            {activeOrNot}
          </button>
          <button className="close2" onClick={close}>
            Close
          </button>
        </p>
      )}
    </div>
  );
};

export default AllQuestionPapers;
