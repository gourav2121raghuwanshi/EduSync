import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Games.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Games = ({courseId}) => {
    const navigate=useNavigate();
    const [words, setWords] = useState([]);
    const [currword, setCurrWord] = useState([]);

    useEffect(() => {
        const getAllWords = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/word/getAllWordsById/${courseId}`);
                setWords(res.data[0].words);
                console.log(res.data[0].words);
            } catch (err) {
                console.log("Cannot get words");
            }
        };
        getAllWords();
    }, [courseId]); // Include courseId in the dependency array to fetch words whenever courseId changes

    useEffect(() => {
        const fetchWordById = async (wordId) => {
            try {
                const res = await axios.get(`http://localhost:4000/api/word/getWordById/${wordId}`);
                // console.log(res.data);
                return res.data;
            } catch (err) {
                console.log("Cannot get word by id", err);
                return null;
            }
        };
        const fetchWordPromises = words.map(word => fetchWordById(word));
    
        Promise.all(fetchWordPromises)
            .then(wordsData => {
                setCurrWord(prevCurrWords => [...prevCurrWords, ...wordsData]);
                console.log(currword);
            })
            .catch(err => {
                console.log("Error fetching word details:", err);
            });
    }, [words]);

        const handleSimonGameClick = () => {
            navigate(`/simongame`);
            console.log("Play Simon Game clicked");
            // Add logic to navigate to the Simon Game page
        };
        const handleWordGameClick = () => {
            navigate(`/publishWord/${courseId}`);
            console.log("Course Id clicked");
            // Add logic to navigate to the Simon Game page
        };
    
    return (
        <div className="container">
            <div className="heading">Interactive Activities ...</div>
            <button className="play-button" onClick={handleSimonGameClick}>
                Play Simon Game
            </button>
            <button className="play-button" onClick={handleWordGameClick}>
                Add a new Word Game
            </button>
            {words.length > 0 && (
                <div>
                    <p>Check Your Knowledge by guessing the words Correctly...</p>
                    <div className="word-container">
                        {currword.map((word, index) => (
                        <a href ={`/playgame/${word._id}`}><div className="word-item" key={index}>
                            <p>{word.hints[0]}</p> {/* Render the current word */}
                        </div></a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
    
        
        
};

export default Games;
