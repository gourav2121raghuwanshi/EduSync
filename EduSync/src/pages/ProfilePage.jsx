import React from 'react';
import axios from 'axios';
import { useRef } from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutUserStart,
    signoutUserSuccess,
    signoutUserFailure
} from '../redux/user/userSlice';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file,setFile]=useState('');
    const [formData, setFormData] = useState({});
     const [uploading, setUpload] = useState(false);

    const [updateSuccess, setUpdateSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };


    const handleImageUpload = async (e) => {
        e.preventDefault();
        setUpload(true);
        const formD = new FormData();
        formD.append("imageFile", e.target.files[0]);
        const response = await axios.post('http://localhost:4000/api/v1/upload/imageUpload', formD, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response.data);
        setFormData({ ...formData, avatar: response.data });
        console.log(formData);
        setUpload(false);
    }


    const handleSignOut = async () => {
        try {
            dispatch(signoutUserStart());
            let res;
            if (currentUser.mode === 'parent')
                res = await axios.get('http://localhost:4000/api/parent/signout');
            if (currentUser.mode === 'teacher')
                res = await axios.get('http://localhost:4000/api/teacher/signout');

            const data = res.data;
            console.log(res);
            if (!data.success) {
                dispatch(signoutUserFailure(data.message));
                return;
            }
            dispatch(signoutUserSuccess(data));
            navigate('/login');
        } catch (err) {
            dispatch(signoutUserFailure(err.message));
        }
    };
    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            let res;
            if (currentUser.mode === 'parent')
                res = await axios.post(`http://localhost:4000/api/parent/update/${currentUser._id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            if (currentUser.mode === 'teacher')
                res = await axios.post(`http://localhost:4000/api/teacher/update/${currentUser._id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            console.log(res);
            const data = await res.data;


            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            // console.log(error);
            dispatch(updateUserFailure(error.message));
        }
    };


    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            console.log(currentUser._id);
            let res;
            if (currentUser.mode === 'parent')
                res = await axios.delete(`http://localhost:4000/api/parent/delete/${currentUser._id}`);

            if (currentUser.mode === 'teacher')
                res = await axios.delete(`http://localhost:4000/api/teacher/delete/${currentUser._id}`);

            const data = await res.data;

            dispatch(deleteUserSuccess(data));
            navigate('/signup');
        }
        catch (err) {
            dispatch(deleteUserFailure(err.message));
            <p className='text-red-600 font-semibold sm:text-2xl text-lg mt-7'>{error ? error.message : ""}</p>

        }
    }

    return (
        <div>
            <Navbar />
            <div className='mx-auto pt-10 max-w-2xl w-10/12'>
                <div className='flex flex-row justify-center'><h1 className='sm:text-4xl text-2xl text-gray-700  font-bold text-center my-7 '>Profile</h1></div>

                <form onSubmit={handleSubmit} className='flex flex-col max-w-2xl  gap-6'>
                    <input
                        onChange={(e) => handleImageUpload(e)}
                        type='file'
                        ref={fileRef}
                        accept='image/*'
                        hidden
                    />
                    <img
                        src={formData?.avatar || currentUser?.avatar}
                        onClick={() => fileRef.current.click()}
                        alt="profile image"
                        loading='lazy'
                        className='rounded-full h-20 w-20  sm:h-40 sm:w-40 object-cover cursor-pointer mt-4 self-center'
                    />
                    {uploading === true && <div className='text-center text-lg text-gray-800 font-semibold'>Uploading...</div>}
                    <input
                        type='text'
                        placeholder='name'
                        defaultValue={currentUser?.name}
                        className='border ring-opacity-50 shadow-lg border-grey-200 sm:text-2xl p-2 sm:p-5 rounded-lg '
                        id='name'
                        onChange={handleChange}
                    />
                    <input type='text'
                        placeholder='email' defaultValue={currentUser.email}
                        className='border border-grey-200 ring-opacity-50 shadow-lg sm:text-2xl p-2 sm:p-5 rounded-lg '
                        id='email'
                        onChange={handleChange}
                    />
                    <input type='password'
                        placeholder='password' defaultValue={currentUser.password}
                        className='border border-grey-200  ring-opacity-50 shadow-lg sm:text-2xl p-2 sm:p-5 rounded-lg '
                        id='password'
                        onChange={handleChange}
                    />
                    <button disabled={loading} className='bg-slate-700 text-white  sm:text-2xl text-lg font-semibold rounded-lg p-1 py-2 sm:p-5 uppercase hover:opacity-95 disabled:opacity-80'>
                        {loading ? 'Loading...' : 'Update'}
                    </button>

                </form>
                <div className='flex justify-between mt-4'>
                    <span onClick={handleDeleteUser} className='text-red-500 text-lg sm:text-xl md:text-2xl font-semibold   cursor-pointer'>Delete Account</span>
                    <span onClick={handleSignOut} className='text-red-500 text-lg sm:text-xl md:text-2xl font-semibold   cursor-pointer'>Sign Out</span>
                </div>
                <p className='text-red-600 font-semibold sm:text-2xl text-lg mt-7'>{error ? error.message : ""}
                </p>
                <p
                    className='text-green-600 font-semibold sm:text-2xl text-lg mt-7'>
                    {updateSuccess ? 'User is Updated Successfully!!' : ""}
                </p>

            </div>
        </div>
    )
}

export default ProfilePage