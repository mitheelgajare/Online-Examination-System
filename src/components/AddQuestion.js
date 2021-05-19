import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const AddQuestion = ({ membership, select }) => {
  const history = useHistory();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  if (membership === "false" || select === "student") {
    history.push("/login");
    return null;
  }

  const handleSubmit = e => {
    e.preventDefault();
    let options_arr = options.split(",");
    const que = { question, options_arr, answer, marks, grade, subject, topic };
    axios.post("http://localhost:5000/addQuestion", que);
    history.push("/home");
    return null;
  };

  return (
    <div className="add-question-page">
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
        <input
          type="text"
          placeholder="Students of which grade should attempt this question?"
          required
          value={grade}
          onChange={e => setGrade(e.target.value)}
          id="grade"
        />
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          placeholder="Subject"
          required
          value={subject}
          onChange={e => setSubject(e.target.value)}
          id="subject"
        />
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
  );
};

export default AddQuestion;
