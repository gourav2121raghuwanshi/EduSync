import React, { useState, useEffect } from 'react';
import './Quiz2.css'; // Import CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const QuestionPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  let courseId = params.courseId;
  const [ques, setQues] = useState('');
  const [ans, setAns] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    if (submissionCount === 4) {
      navigate('/');
    }
  }, [submissionCount, navigate]);

  const handleOptionsChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/api/question/addQuizQuestion/${courseId}`, {ques, ans, options});
      console.log(res.data);
      // Clear form fields after successful submission
      setQues('');
      setAns('');
      setOptions(['', '', '', '']);
      setSubmissionCount(submissionCount + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="heading">Question {submissionCount+1}</div>
      <div className="quiz-container">
        <div className="question-section">
          <p>Ask Your Question</p>
          <input
            type="text"
            placeholder='Enter Your Question'
            value={ques}
            onChange={(e) => setQues(e.target.value)}
          />
        </div>
        <div className="options-section">
          <p>Enter Your Options</p>
          {options.map((option, index) => (
            <div className="option-row" key={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionsChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="answer-section">
          <p>Enter Correct Answer</p>
          <input
            type="text"
            placeholder='Enter Correct Answer'
            value={ans}
            onChange={(e) => setAns(e.target.value)}
          />
        </div>
        <button className="btn" type='submit'>{submissionCount === 3 ? 'Submit' : 'Post'}</button>
      </div>
    </form>
  );
};

export default QuestionPage;
