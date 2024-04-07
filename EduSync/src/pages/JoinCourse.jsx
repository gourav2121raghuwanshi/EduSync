import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const JoinCourse = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleJoinCourse = async (e) => {
        try {
            e.preventDefault();
            console.log(code,currentUser._id);
            const res = await axios.post(`http://localhost:4000/api/course/JoinCourseByCourseId`, {
                courseId: code,
                studentId: currentUser._id
            });
            console.log(res);

            const data = res.data;
            console.log(data);
            if (!data.success) {
                setError(data.message || 'An error occurred while joining the course.');
                return;
            }
            // If the joining process is successful, navigate to the parent page or any appropriate page
            navigate(`/ParentPage`);
        } catch (error) {
            setError('An error occurred while joining the course.');
            console.error('Error joining course:', error);
        }
    };

    return (
        <div>
        <Navbar/>
        <div className='w-full h-full mx-auto p-5 flex flex-row justify-center items-center'>
            <div className='w-[780px] mx-auto flex flex-col gap-6'>
                <form className='flex flex-col gap-3 p-4 border-2 border-opacity-50 rounded-xl border-gray-600'>
                    <h1 className='text-3xl text-gray-900'>
                        Class code
                    </h1>
                    <p>
                        Ask your teacher for the class code, then enter it here.
                    </p>
                    <input
                        className='border-gray-600 border-2 border-opacity-50 rounded-lg w-fit p-4'
                        value={code}
                        placeholder='Enter the code'
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button
                        onClick={handleJoinCourse}
                        className='bg-blue-400 rounded-lg flex flex-row justify-center  text-center w-[25%] sm:w-[15%] px-4 py-2 hover:transition-all duration-300 hover:scale-105 text-white'
                    >
                        Join
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
                <div className='mt-2 '>
                    <span className='font-semibold'>To sign in with a class code</span>
                    <ul className="list-disc pl-4">
                        <li>Use an authorized account</li>
                        <li>Use a class code with 5-7 letters or numbers, and no spaces or symbols</li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    );
};

export default JoinCourse;
