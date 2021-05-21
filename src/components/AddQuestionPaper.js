import React, { useState, useEffect } from "react";
import axios from "axios";

const AddQuestionPaper = () => {
  return (
    <div className="add-question-paper">
      <div className="title">Add Question Paper</div>
      <form action="">
        <label htmlFor="n"></label>
        <input type="text" placeholder="Name" id="n" />
        <label htmlFor=""></label>
      </form>
    </div>
  );
};

export default AddQuestionPaper;
