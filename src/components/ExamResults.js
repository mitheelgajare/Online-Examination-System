import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import HomePageNav from "./HomePageNav";

const ExamResults = ({ currentUser, membership, select }) => {
  const history = useHistory();
  const [results, setResults] = useState([]);
  const [keymap, setKeymap] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/getExamResults?uid=${currentUser}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setResults(data);
      });

    fetch("http://localhost:5000/getResultNameById")
      .then(res => res.json())
      .then(data => {
        setKeymap(data);
      });
  }, []);

  if (membership === "false" || select !== "student") {
    history.push("/");
    return null;
  }

  return (
    <div className="exam-results-page">
      <HomePageNav select={select} />
      <div className="title">Exam Results</div>
      {keymap && (
        <table cellSpacing="0">
          <tr>
            <th>Exam Name</th>
            <th>Percentage</th>
            <th>Marks Obtained</th>
            <th>Total Marks</th>
          </tr>
          {results.length !== 0 ? (
            results.map(result => (
              <tr>
                <td>{keymap[result.qpid]}</td>
                <td>{result.overallResult}</td>
                <td>{result.marksObtained}</td>
                <td>{result.totalMarks}</td>
              </tr>
            ))
          ) : (
            <td colSpan="4">No results</td>
          )}
        </table>
      )}
    </div>
  );
};

export default ExamResults;
