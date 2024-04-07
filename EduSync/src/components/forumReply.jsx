import React from 'react'
import {useParams} from 'react-router-dom'
import { useState } from 'react';
import {useSelector} from 'react-redux'
import Navbar from './Navbar';
import axios from 'axios';
import {useNavigate} from  'react-router-dom'

const ReplyForum = () => {
    const {id}  = useParams();
    const [formData, setformData] = useState();
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setformData(e.target.value)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const obj = {
            "text": formData,
            "user": currentUser._id,
            "name" : currentUser.name
        };
        console.log(obj);
        try {
            const res = await axios.post(backendUrl+'/api/resources/reply/'+id, obj, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.data;
            navigate("/forum")
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <Navbar />
    <div className=' py-4 px-2'>
        <p>Enter Your Reply</p>
        <textarea className='border w-full p-2 bg-gray-200' onChange={handleChange} value={formData}></textarea>
        <br></br>
        <button className='button' onClick={handleSubmit} >Submit</button>
    </div>
    </>
  )
}

export default ReplyForum