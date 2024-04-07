import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {  useSelector } from 'react-redux';
import {useNavigate} from  'react-router-dom'

const WebinarsCreate = () => {
    const [formData, setformData] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setformData({
            ...formData,
            "user": currentUser._id,
            "name" : currentUser.name
        });
        console.log(formData);
        try {
            const res = await axios.post(backendUrl+'/api/webinars/create', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.data;
            console.log(data);
            navigate('/webinar')
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <Navbar />
    <div className='flex items-center justify-center'>
        <form className='  inline-block px-4 py-3 w-full' onSubmit={handleSubmit}>
            <div>
                <p>Title</p>
                <input type='text' className='w-full rounded-lg border px-2 py-1' name="title" onChange={handleChange} value={formData.value} />
            </div>
            <div>
                <p>Description</p>
                <textarea className='w-full rounded-lg border p-2' type='text' name="description" onChange={handleChange} value={formData.value} />
            </div>
            <div>
                <p>Hosts</p>
                <input type='text' className='w-full rounded-lg border px-2 py-1' name="host" onChange={handleChange} value={formData.value} />
            </div>
            <div>
                <p>Topics</p>
                <input type='text' className='w-full rounded-lg border px-2 py-1' name="topics" onChange={handleChange} value={formData.value} />
            </div>
            <div>
                <p>Meet Link</p>
                <input type='text' className='w-full rounded-lg border px-2 py-1' name="link" onChange={handleChange} value={formData.value} />
            </div>
            <div>
                <p>Time</p>
                <input type="datetime-local" className='border p-1  rounded-lg'
                    name="time"
                    onChange={handleChange} value={formData.value}
                    min="2024-01-01T00:00"
                    max="2026-06-14T00:00"
                />
            </div>
            <br />
            <input className='button px-3 py-1 rounded-md bg-gray-300' type='submit' value={"Create"} />
        </form>
    </div>
    </>
  )
}

export default WebinarsCreate