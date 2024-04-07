import React, { useState } from 'react';
import './Quiz2.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const WordPage = () => {
  const navigate = useNavigate(); 
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  let id = currentUser._id;
  const {courseId} = params;
  const [word, setWord] = useState('');
  const [hints, setHints] = useState(['', '', '', '', '']); // Array to store hints

  const handleHintChange = (index, value) => {
    const newHints = [...hints];
    newHints[index] = value;
    setHints(newHints);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/api/word/addWord/${courseId}`, { word, hints });
      console.log(res.data); 
      setWord(''); setHints(['', '', '', '', '']);
      navigate(`/games/${courseId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="heading">Post Your Word</div>
      <div className="quiz-container">
        <div className="question-section">
          <p>Type Your Word</p>
          <input type="text" placeholder='Enter Your Word' value={word} onChange={(e) => setWord(e.target.value)} />
        </div>
        <div className="options-section">
          <p>Enter Your Hints</p>
          {hints.map((hint, index) => (
            <div className="option-row" key={index}>
              <input type="text" placeholder={`Hint ${index + 1}`} value={hint} onChange={(e) => handleHintChange(index, e.target.value)} />
            </div>
          ))}
        </div>
        <button className="btn" type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default WordPage;
