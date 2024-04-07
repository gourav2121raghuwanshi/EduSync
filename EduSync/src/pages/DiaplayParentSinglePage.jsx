import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Chat from '../components/Chat';
import QuizPage from './QuizPage';
import Games from './Games';

const DisplayParentSinglePage = () => {


    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [marks, setMarks] = useState();
    const [totalmarks, settotalMarks] = useState();
    const [activeTab, setactiveTab] = useState('discussion');

    const [showmarks, setshowmarks] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/parent/displaySingleCourse/${id}`);
                const data = res.data;
                setCourse(data);
                setTeacher(data.teacher);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [id]);



    const getMarks = async () => {
        console.log(id, currentUser._id);
        try {
            const res = await axios.post("http://localhost:4000/api/marks/getMarks", { "courseId": course._id, "userId": currentUser._id });
            const data = res.data;
            console.log(data);
            setshowmarks(true);
            setMarks(data.marks);
            settotalMarks(data.totalmarks);
        } catch (error) {
            console.log(error.message);
        }
    };

    const arr = [
        { "name": "discussion" },
        { "name": "quiz" },
        { "name": "games" }
    ];

    return (
        <div>
            <Navbar />
            <div className='w-full p-4 h-full'>
                <div className='h-screen w-10/12 mx-auto mt-3'>
                    {
                        course && (
                            <div className='flex relative flex-row justify-between p-4 rounded-xl border-2 border-gray-700 border-opacity-50 items-center'>
                                <div>
                                    <h1 className='font-semibold sm:text-2xl text-xl underline text-gray-800'>{course.title}</h1>
                                    <h2 className='font-semibold text-xl'>Instructor: {teacher ? teacher.name : ''}</h2>
                                    <p className='text-lg text-gray-700'>{course.description}</p>
                                </div>
                                <div className='flex flex-row items-end'>
                                
                                    {
                                        showmarks === false && <button onClick={getMarks} className='bg-blue-400  items-end text-gray-700 rounded-xl px-3 py-2'>Marks</button>
                                    }
                                </div>
                                <div className=''>
                                    {
                                        showmarks === true && <span className='bg-blue-400 text-gray-700 rounded-xl px-3 py-2'>{marks} / {totalmarks}</span>
                                    }
                                </div>
                            </div>
                        )
                    }
                    <div className='flex flex-row gap-1 mt-4 border-b '>
                        {arr.map((value, idx) => (
                            <div key={idx} className='flex flex-row justify-left'>
                                <button onClick={()=>{setactiveTab(value.name)}} className='bg-blue-400 rounded-t-xl px-3 py-2'>{value.name}</button>
                            </div>
                        ))}
                    </div>
                    {activeTab==="discussion" && <Chat courseId={id} />}
                    {activeTab==="quiz" && <QuizPage courseId={id}  />}
                    {activeTab==="games" && <Games courseId={id}  />}
                </div>
            </div>
        </div>
    );
};

export default DisplayParentSinglePage;
