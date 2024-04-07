import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import image from '../../public/learning-education-ideas-insight-intelligence-study-concept.jpg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const CourseCreate = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate=useNavigate();
    const handelFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log()
            const res = await axios.post('http://localhost:4000/api/course/createCourse', { title, description, teacher: currentUser._id.toString()});
            console.log(res.data);
            navigate(`/displaySingleCourse/${res.data._id}`);
        
        } catch (error) {
            console.error('Error occurred:', error.message);
        }
    };

    return (
        <div>
        <Navbar/>
        <div className='h-screen mx-auto w-full flex p-3 flex-row items-center justify-center'>
            <div className='flex justify-center items-center gap-3 w-full flex-col sm:flex-row '>
                {/* Image div with 60% width */}
                <div className='w-3/5'>
                    <img src={image} alt="Course" loading="lazy" className='w-full h-full object-cover rounded-xl' />
                </div>
                {/* Form div with 40% width */}
                <form onSubmit={handelFormSubmit} className='bg-blue-300 rounded-lg h-full w-full sm:w-2/5'>
                    <div className='w-4/5 h-full mx-auto bg-blue-300 flex flex-col justify-center rounded-md p-4'>
                        <div className='w-4/5 mx-auto flex flex-row items-center justify-center bg-blue-300 rounded-md p-4'>
                            <h1 className='text-gray-800 text-3xl bg-blue-300 font-semibold'>Create a New Course</h1>
                        </div>
                        <div className='flex flex-row items-center justify-center'>
                            <input className='border-gray-600 rounded-lg p-2 m-3' type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter the Title.' />
                        </div>
                        <div className='flex flex-row items-center justify-center'>
                            <input className='border-gray-600 rounded-lg p-2 m-3' type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter the Description.' />
                        </div>
                        <button type='submit' className='mx-auto px-3 py-2 rounded-lg bg-blue-500 text-gray-800'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default CourseCreate;
