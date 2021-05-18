import React, { useState, useEffect } from "react";

const AddQuestion = () => {
  const handleSubmit = e => {
    e.preventDefault();
    let options_arr = options.split(",");
    const que = { question, options_arr, answer, marks, grade, subject, topic };
    fetch("http://localhost:5000/writeFile").then(res => {
      console.log(res.json());
    });
    console.log(que);
    return null;
  };

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

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
