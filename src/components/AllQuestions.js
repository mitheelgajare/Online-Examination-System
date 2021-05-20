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
          return <div className="all-questions">{question.question}</div>;
        })}
    </div>
  );
};

export default AllQuestions;
