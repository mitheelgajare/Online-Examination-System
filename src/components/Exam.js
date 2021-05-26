import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import HomePageNav from "./HomePageNav";
import { Link } from "react-router-dom";
import axios from "axios";

const Exam = ({ select, membership, currentUser }) => {
  const history = useHistory();
  const [questionPapers, setQuestionPapers] = useState([]);
  const [currentQuestionPaper, setCurrentQuestionPaper] = useState(null);
  const [currentQuestionPaperQuestion, setCurrentQuestionPaperQuestion] =
    useState(null);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/getActiveQuestionPapers?uid=${currentUser}`)
      .then(res => res.json())
      .then(data => {
        let new_data = data.filter(dat => {
          return dat.isActive === true;
        });
        setQuestionPapers(new_data);
      });

    if (
      sessionStorage.getItem("OES-refreshed") === null ||
      sessionStorage.getItem("OES-refreshed") === "null"
    ) {
      sessionStorage.setItem("OES-refreshed", "false");
      sessionStorage.setItem("OES-CP", "");
    } else if (sessionStorage.getItem("OES-refreshed") === "true") {
      handleSubmit();
      sessionStorage.setItem("OES-refreshed", "false");
    } else {
    }
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
        data.forEach(question => {
          count += parseInt(question.marks);
        });
        setTotalMarks(count);
        sessionStorage.setItem("OES-refreshed", "true");
        sessionStorage.setItem("OES-CP", JSON.stringify(questionPaper.id));
      });
  };

  const handleSubmit = async e => {
    if (e) {
      e.preventDefault();
    }
    let toBeSent = {};
    const radioButtons = document.querySelectorAll(".radio");
    toBeSent["uid"] = currentUser;

    if (!currentQuestionPaper) {
      alert("Your marks will not be counted as you refreshed the page");
      toBeSent["qpid"] = parseInt(sessionStorage.getItem("OES-CP"));
      toBeSent["result"] = {};
    } else {
      toBeSent["qpid"] = currentQuestionPaper.id;
      let result = {};
      radioButtons.forEach(rb => {
        if (rb.checked) {
          console.log(rb.name);
          console.log(rb.value);
          result[rb.name] = rb.value;
        }
      });
      toBeSent["result"] = result;
    }
    await axios
      .post("http://localhost:5000/saveResult", toBeSent)
      .then(res => {
        if (res.status === 201) {
          if (currentQuestionPaper) {
            alert(
              "Thank you for attempting the exam. Your results have been saved.\nHave a nice day!"
            );
          }
        }
      })
      .catch(err => {
        alert("Something went wrong!");
      });

    setCurrentQuestionPaperQuestion(null);
    sessionStorage.setItem("OES-refreshed", "false");
    window.location.reload();
  };

  if (membership === "false" || select !== "student") {
    history.push("/");
    return null;
  }

  return (
    <div className="all-question-papers-page">
      <HomePageNav select={select} />
      <div className="ctl">Click the link to attempt the examination</div>
      <ol>
        {questionPapers.length !== 0 ? (
          questionPapers.map(questionPaper => (
            <li>
              <Link
                className="test-link"
                onClick={() => callQuestionPaper(questionPaper)}
              >
                {questionPaper.name}
              </Link>
            </li>
          ))
        ) : (
          <div>No Exams 😀</div>
        )}
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
                <div className="marks">Marks:{question.marks}</div>
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
