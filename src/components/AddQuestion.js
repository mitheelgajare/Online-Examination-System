import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { grades, subjects } from "./arraysData";
import HomePageNav from "./HomePageNav";

const AddQuestion = ({ membership, select }) => {
  const history = useHistory();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("1");
  const [subject, setSubject] = useState("Maths");
  const [topic, setTopic] = useState("");
  const [isPending, setIsPending] = useState(false);

  if (membership === "false" || select === "student") {
    history.push("/login");
    return null;
  }
  console.log(select);

  const handleSubmit = e => {
    e.preventDefault();
    let options_arr = options.split(",");

    if (options_arr.length !== 4) {
      alert("There can only be four options");
      return null;
    }

    if (!options_arr.includes(answer)) {
      alert("The answer has to be present in the options");
      return null;
    }

    setIsPending(true);

    const que = { question, options_arr, answer, marks, grade, subject, topic };
    axios
      .post("http://localhost:5000/addQuestion", que)
      .then(res => {
        if (res.status === 201) {
          alert("Question added successfully!");
          setIsPending(false);
          window.location.reload();
          return null;
        }
      })
      .catch(err => {
        alert("Something went wrong.");
        return null;
      });
  };

  return (
    <div className="add-question-page">
      <HomePageNav select={select} />
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <div>
          <div className="title">Add a Question</div>
          <form action="" autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="statement" className="statement">
              Question Statement
            </label>
            <input
              type="text"
              placeholder="Question Statement"
              required
              value={question}
              onChange={e => setQuestion(e.target.value)}
              id="statement"
            />
            <label htmlFor="options">Options</label>
            <input
              type="text"
              placeholder="Please type the options separated by commas"
              required
              value={options}
              onChange={e => setOptions(e.target.value)}
              id="options"
            />
            <label htmlFor="answer">Correct Answer</label>
            <input
              type="text"
              placeholder="Correct Answer"
              required
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              id="answer"
            />
            <label htmlFor="marks">Marks</label>
            <input
              type="text"
              placeholder="Marks"
              required
              value={marks}
              onChange={e => setMarks(e.target.value)}
              id="marks"
            />
            <label htmlFor="grade">Grade</label>
            <select
              value={grade}
              onChange={e => setGrade(e.target.value)}
              id="grade"
            >
              {grades.map(grade => (
                <option value={grade}>{grade}</option>
              ))}
            </select>
            <label htmlFor="subject">Subject</label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              id="subject"
            >
              {subjects.map(subject => (
                <option value={subject}>{subject}</option>
              ))}
            </select>
            <label htmlFor="topic">Topic</label>
            <input
              type="text"
              placeholder="Topic"
              required
              value={topic}
              onChange={e => setTopic(e.target.value)}
              id="topic"
            />
            <button>Submit!</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
