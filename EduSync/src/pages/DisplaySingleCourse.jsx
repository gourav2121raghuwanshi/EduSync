import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import QuizPage from './QuizPage';
import Games from './Games';

const DisplaySingleCourse = () => {
    const { id } = useParams();
    console.log(id + "<-");
    console.log(id);
    const [courseJoinId, setcourseJoinId] = useState();
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [students, setStudents] = useState(null);
    const [activeTab, setactiveTab] = useState("discussion");

    useEffect(() => {
        const getCourse = async () => {
            try {
                console.log(id);
                const res = await axios.get(`http://localhost:4000/api/course/getCourseByCourseId/${id}`);
                const data = await res.data;
                setcourseJoinId(data.courseId);
                settitle(data.title);
                setdescription(data.description);
                console.log("id of course=> ", data);

            } catch (err) {
                console.log(err.message);
            }
        }
        getCourse();
    }, []);

    useEffect(() => {
        const getAllStudents = async () => {
            try {
                console.log('students are: ')
                const res = await axios.get(`http://localhost:4000/api/course/getAllStudents/${id}`);
                const data = res.data;
                console.log("students are ", data.students);
                setStudents(data.students);
            } catch (err) {
                console.log(err.message + "error");
            }
        }
        getAllStudents();
    }, [])
    let flags;
    let marks;
    let totalmarks;
    if (students) {
        flags = new Array(students.length);
        marks = new Array(students.length);
        totalmarks = new Array(students.length);
        for (let i = 0; i < students.length; i++) {
            flags[i] = false;
        }
    }
    const fetchMarks = async (ide, index) => {
        try {
            const res = await axios.post(`http://localhost:4000/api/marks/getMarks`, { courseId: id, userId: ide });
            const data = res.data;
            console.log("data is : " + data.marks);
            flags[index] = true;
            marks[index] = data.marks;
            console.log(flags[index]);
            console.log("index is : " + index);
            totalmarks[index] = data.totalmarks;
        } catch (err) {
            console.log(err.message + "error");
        }
    }

    if (students && students.length >= 1) console.log("stud are ", students[0].name);
    return (
        <div>
            <Navbar />
            <div className='h-screen mx-auto w-full mt-3 '>
                <div className='border-2 border-gray-800 border-opacity-50 w-[50%] justify-center items-center mx-auto my-3  rounded-xl'>

                    <h1 className='text-gray-800 mt-3 mb-1 text-2xl text-center font-semibold'>{title} </h1>
                    <h1 className='text-gray-800 mt-1 mb-1 text-xl text-center '>{description}</h1>
                    <h1 className='text-gray-800 mt-1 mb-3 text-xl text-center '>courseId : <span className='text-green-700'> {courseJoinId}</span> </h1>

                </div>
                <div className='mx-auto flex gap-5 justify-around'>
                    <button onClick={()=>setactiveTab("discussion")} className='bg-blue-400 p-3 rounded-xl inline-block'>discussion</button>
                    <button onClick={()=>setactiveTab("quiz")} className='bg-blue-400 p-3 rounded-xl inline-block'>Quiz</button>
                    <button onClick={()=>setactiveTab("games")} className='bg-blue-400 p-3 rounded-xl inline-block'>Games</button>
                </div>
                {activeTab==="discussion" && <Chat courseId={id} />}
                    {activeTab==="quiz" && <QuizPage courseId={id}  />}
                    {activeTab==="games" && <Games courseId={id}  />}

                {
                    students && <span className='text-xl my-2 flex flex-row items-center justify-center font-semibold text-gray-800'>Students are : </span>
                }

                <div className='flex flex-col gap-3 justify-center   p-3 w-[80%]  mx-auto rounded-xl'>
                    {
                        students && students.length > 0 &&
                        students.map((student, index) => (
                            <div key={index} className='flex bg-blue-300 rounded-xl items-center px-2 py-1  flex-row justify-between'>
                                <div className='text-gray-800  flex flex-row px-4 justify-between font-semibold text-center'>{student.name}</div>
                                {
                                    flags[index] === false && <button className='bg-blue-500 px-3 py-2 rounded-xl text-gray-100 hover:transition-all duration-200 hover:scale-105' onClick={() => fetchMarks(student._id, index)}>Marks</button>
                                }
                                {
                                    flags[index] === true && <span className='bg-blue-500 px-3 py-2 rounded-xl text-gray-100 hover:transition-all duration-200 hover:scale-105'>{marks[index]} / {totalmarks[index]}</span>
                                }
                            </div>
                        ))
                    }
                    {
                        !students &&
                        <div className='text-gray-800  font-semibold text-center'>
                            No Student Enrolled
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default DisplaySingleCourse;
