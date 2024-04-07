import React from 'react';
import axios from 'axios'; // Make sure axios is imported
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signoutUserStart, signoutUserSuccess, signoutUserFailure } from '../redux/user/userSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.user); // Assuming your error state is managed in userSlice

    const handleDeleteUser = async () => {
    };

    const handleSignOut = async () => {
        try {
            dispatch(signoutUserStart());
            const res = await axios.get('http://localhost:4000/api/parent/signout');
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

    return (
        <div className='mx-auto pt-24 max-w-2xl w-10/12'>
            <div className='flex justify-between items-center'>
                <div><h1 className='sm:text-4xl text-2xl text-gray-700 font-bold text-center my-7'>Profile</h1></div>
            </div>
        
            <div className='flex justify-between mt-4'>
                <span onClick={handleSignOut} className='text-red-500 text-lg sm:text-xl md:text-2xl font-semibold cursor-pointer'>Sign Out</span>
            </div>
            <p className='text-red-600 font-semibold sm:text-2xl text-lg mt-7'>{error ? error.message : ''}</p>
        </div>
    );
};

export default ProfilePage;
