import React, { useState, useEffect } from "react";

const AllQuestions = () => {
  const [questions, setQuestions] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/getQuestions")
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setIsPending(false);
      });
  }, []);

  return (
    <div className="all-questions-page">
      <div className="title">All Questions</div>
      {isPending && <div>Loading...</div>}
      {questions &&
        questions.map(question => {
          return (
            <div className="all-questions">
              {question.question}
              <div className="options">
                {question.options_arr.map(opt => (
                  <span>{opt},</span>
                ))}
              </div>
              <div className="answer">Correct Answer: {question.answer}</div>
              <div className="marks">Marks: {question.marks}</div>
              <div className="grade">Grade: {question.grade}</div>
              <div className="subject">Subject: {question.subject}</div>
              <div className="topic">Topic : {question.topic}</div>
            </div>
          );
        })}
    </div>
  );
};

export default AllQuestions;
