import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const WordGamePage = () => {
  const params = useParams();
  const {wordId} = params;
  const [hints, setHints] = useState([]);
  const [originalWord, setOriginalWord] = useState('');
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(5);
  const [success, setSuccess] = useState(false);
  const [exhausted, setExhausted] = useState(false);
  

  useEffect(() => {
    const fetchWordById = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/word/getWordById/${wordId}`);
            console.log(res.data.hints, res.data.word);
            setHints(res.data.hints);
            setOriginalWord(res.data.word);
        } catch (err) {
            console.log("Cannot get word by id", err);
            return null;
        }
    };
    fetchWordById();
  },[])

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === originalWord) {
      setSuccess(true);
    } else if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
      setScore(score - 1);
    } else {
      setScore(score - 1);
      setExhausted(true);
    }
    setUserInput('');
  };

  const handleTryAgain = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.location.href = `/`;
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Word Game</h2>
      {!success && !exhausted && (
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Guess the word:
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'skyblue', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
          <p>{hints[currentHintIndex]}</p>
          <p>Score: {score}</p>
        </form>
      )}
      {success && (
        <div>
        <p style={{ fontSize: '18px', color: 'green' }}>
          Congratulations! You guessed the word correctly. Final Score: {score}
        </p>
        <button onClick={handleGoBack} style={{ padding: '10px', margin: '5px', backgroundColor: 'skyblue', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Go Back</button>
      </div>
      )}
      {exhausted && (
        <div>
          <p style={{ fontSize: '18px', color: 'red' }}>
            Better luck next time. Final Score: {score}
          </p>
          <button onClick={handleTryAgain} style={{ padding: '10px', margin: '5px', backgroundColor: 'skyblue', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Try Again</button>
          <button onClick={handleGoBack} style={{ padding: '10px', margin: '5px', backgroundColor: 'skyblue', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default WordGamePage;
