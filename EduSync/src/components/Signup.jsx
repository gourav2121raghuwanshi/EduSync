import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const Signup = () => {
    let backendUrl = "http://localhost:4000";
    const [mode, setmode] = useState('parent');
    const navigate = useNavigate();
    const { loading, error, currentUser } = useSelector((state) => state.user);

    const [formdata1, setformdata1] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [formdata2, setformdata2] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleChangeParent = (e) => {
        setformdata1({
            ...formdata1,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangeTeacher = (e) => {
        setformdata2({
            ...formdata2,
            [e.target.name]: e.target.value,
        });
    };

    const handleParentSignup = async (e) => {
        e.preventDefault();
        try {
            console.log("form Data: " + formdata1)
            const res = await axios.post(backendUrl + '/api/parent/sign-up', formdata1, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.data;
            console.log("data is : ", data)
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (currentUser && currentUser.mode === 'parent') {
            navigate('/ParentPage')
        }
        if (currentUser && currentUser.mode === 'teacher') {
            navigate('/TeacherPage')
        }
    }, [])

    const handleTeacherSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(backendUrl + '/api/teacher/sign-up', formdata2, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.data;
            console.log("data is : ", data)
            console.log(res)
            navigate('/login')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='flex-row flex mx-auto justify-center w-full h-[100vh]  items-center' >
            <div className='w-[60%] sm:w-[60%] md:w-[40%] mx-auto flex flex-row items-center justify-center '  >
                <div className=' bg-blue-300  px-2 py-4 rounded-2xl w-full  '>
                    <div className='text-center text-gray-800 text-2xl font-semibold '>Signup</div>
                    <br />
                    <div className='flex justify-center gap-4'>
                        <button className=' bg-green-200 px-3 py-2 text-gray-600 rounded-xl ' onClick={() => setmode('parent')}>Sign Up as Parent</button>

                        <button className='  bg-green-200 px-3 py-2 text-gray-600 rounded-xl' onClick={() => setmode('teacher')}>Sign Up as teacher</button>
                    </div>
                    <br />
                    <div>
                        {(mode == 'parent') ?
                            <div className=' text-gray-800 text-center '>
                                Signing Up in as Parent.  <br /> <br />
                                <form className='flex text-center flex-col gap-2 ' onSubmit={handleParentSignup}>
                                    <div>
                                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:sm:w-[50%]' type='' name='name' value={formdata1.name} onChange={handleChangeParent} placeholder='Enter your name.' />
                                    </div>
                                    <div>
                                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:w-[50%]' type='email' name='email' value={formdata1.email} onChange={handleChangeParent} placeholder='Enter the email.' />
                                    </div>
                                    <div>
                                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:w-[50%]' type='password' name='password' value={formdata1.password} onChange={handleChangeParent} placeholder='Enter your Password.' />
                                    </div>
                                    <div>
                                        <input className='hover:transition-all   duration-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-xl bg-green-200 text-gray-600' type='submit' value={'Signup'} />
                                    </div>
                                </form>
                                <div>Already have an account <Link className='text-gray-900 font-semibold text-lg' to={'/login'}>Login</Link></div>

                            </div>
                            : <div className='text-center text-gray-800'>
                                Signing Up in as Teacher. <br /> <br />
                                <form className='flex text-center  flex-col gap-2' onSubmit={handleTeacherSignup}>
                                    <div>
                                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:w-[50%]' type='' name='name' value={formdata2.name} onChange={handleChangeTeacher} placeholder='Enter your name.' />
                                    </div>
                                    <div>
                                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:w-[50%]' type='email' name='email' value={formdata2.email} onChange={handleChangeTeacher} placeholder='Enter the email.' />
                                    </div>
                                    <div>
                                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:w-[50%]' type='password' name='password' value={formdata2.password} onChange={handleChangeTeacher} placeholder='Enter your Password.' />
                                    </div>
                                    <div>
                                        <input className='hover:transition-all   duration-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-xl bg-green-200 text-gray-600' type='submit' value={'Signup'} />
                                    </div>
                                </form>
                                <div>Already have an account <Link className='text-gray-900 font-semibold text-lg' to={'/login'}>Login</Link></div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup