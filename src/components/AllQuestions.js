import React, { useState, useEffect } from "react";
import { grades, subjects } from "./arraysData";
import axios from "axios";
import HomePageNav from "./HomePageNav";
import { useHistory } from "react-router";

const AllQuestions = ({ select, membership }) => {
  const [questions, setQuestions] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [gradeInput, setGradeInput] = useState("1");
  const [subjectInput, setSubjectInput] = useState("maths");
  const [name, setName] = useState("");
  const history = useHistory();
  if (select === "student" || membership === "false") {
    history.push("/home");
    return null;
  }
  const handleClick = e => {
    e.preventDefault();
    setIsPending(true);
    fetch(
      `http://localhost:5000/getQuestions?grade=${gradeInput}&subject=${subjectInput}`
    )
      .then(res => res.json())
      .then(res => {
        setQuestions(res);
        setIsPending(false);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let flag = false;
    const checkboxes = document.querySelectorAll(".checkbox");
    let ids = [];
    checkboxes.forEach(checkbox => {
      if (checkbox.checked === true) {
        flag = true;
        ids.push(checkbox.value);
      }
    });
    if (!flag) {
      alert("You have to select at least one question");
      return null;
    }

    let data = {
      subject: questions[0].subject,
      name: name,
      questions: ids,
    };

    axios
      .post("http://localhost:5000/addQuestionPaper", data)
      .then(res => {
        if (res.status === 201) {
          alert("Question paper successfully created");
          return null;
        }
      })
      .catch(err => {
        alert("Something went wrong");
      });
  };

  const handleSelect = () => {
    const topCheckbox = document.querySelector("#top-checkbox");

    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach(checkbox => {
      checkbox.checked = topCheckbox.checked;
    });
  };
  return (
    <div className="all-questions-page">
      <HomePageNav select={select} />
      <div className="title">All Questions</div>
      <br />
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <form action="" autoComplete="off">
          <div className="title">Filter by grade or subject</div>

          <select
            value={gradeInput}
            onChange={e => setGradeInput(e.target.value)}
          >
            {grades.map(grade => (
              <option value={grade}>{grade}</option>
            ))}
          </select>
          <select
            value={subjectInput}
            onChange={e => setSubjectInput(e.target.value)}
          >
            {subjects.map(subject => (
              <option value={subject}>{subject}</option>
            ))}
          </select>
          <button onClick={handleClick}>Go!</button>
        </form>
      )}
      {questions && (
        <div className="all-questions">
          <table cellPadding="10">
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="top-checkbox"
                  onClick={handleSelect}
                />
              </th>
              <th>Question Statement</th>
              <th>Answer</th>
              <th>Marks</th>
              <th>Topic</th>
            </tr>
            {questions.length !== 0 ? (
              questions.map(question => (
                <tr className="data-tr">
                  <td>
                    <input
                      type="checkbox"
                      value={question.id}
                      className="checkbox"
                    />
                  </td>
                  <td>{question.question}</td>
                  <td>{question.answer}</td>
                  <td>{question.marks}</td>
                  <td>{question.topic}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No results</td>
              </tr>
            )}
          </table>
        </div>
      )}

      <form action="" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name of Question Paper"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button>Create Question Paper</button>
      </form>
    </div>
  );
};

export default AllQuestions;
