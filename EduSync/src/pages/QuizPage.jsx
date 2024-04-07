import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const QuizPage = ({courseId}) => {
    const navigate=useNavigate();

    const handleGameClick = () => {
        navigate(`/publishQuestion/${courseId}`);
        console.log("Course Id clicked");
        // Add logic to navigate to the Simon Game page
    };

  return (
    <div className="container">
            <div className="heading">Quizes ...</div>
            <button className="play-button" onClick={handleGameClick}>
                Add Quizes
            </button>
            {
                <div>
                    <p>Check Your Knowledge by playing the quizes...</p>
                    <div className="word-container">
                        <a href ={`/quiz/${courseId}`}><div className="word-item">
                            <p>Play Quiz</p> {/* Render the current word */}
                        </div>
                        </a>
                    </div>
                </div>
            }
        </div>
  )
}

export default QuizPage