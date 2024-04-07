import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"

const Login = () => {
    const { loading, error,currentUser } = useSelector((state) => state.user);
    // const { } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mode, setmode] = useState('parent');
    const [formdata1, setformdata1] = useState({
        email: '',
        password: '',
    });

    const [formdata2, setformdata2] = useState({
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

    // =================================================================
    const handleParentLogin = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(backendUrl+'/api/parent/login', formdata1, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.data;
            dispatch(signInSuccess(data));
            console.log("data is : ", data)
            console.log(res)
            navigate('/ParentPage')
        } catch (error) {
            console.error(error);
        }
    }
    const handleTeacherLogin = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(backendUrl+'/api/teacher/login', formdata2, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.data;
            dispatch(signInSuccess(data));
            console.log("data is : ", data)
            console.log(res)
            navigate('/TeacherPage')

           
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



  return (
    <div className='flex-row flex mx-auto justify-center w-full h-[100vh]  items-center' >
    <div className='w-[60%] sm:w-[60%] md:w-[40%] mx-auto flex flex-row items-center justify-center '  >
    <div className=' bg-blue-300  px-2 py-4 rounded-2xl w-full  '>
        <div className='text-center text-gray-800 text-2xl font-semibold '>Login</div>
        <br/>
        <div className='flex justify-center gap-4'>
            <button className=' bg-green-200 px-3 py-2 text-gray-600 rounded-xl ' onClick={()=>setmode('parent')}>login as Parent</button>
            
            <button className='  bg-green-200 px-3 py-2 text-gray-600 rounded-xl' onClick={()=>setmode('teacher')}>login as teacher</button>
        </div>
        <br/>
        <div>
            {(mode=='parent')?
            <div className='text-center text-gray-800 '>
                Logging in as Parent.  <br /> <br />
                <form className='flex flex-col gap-2 ' onSubmit={handleParentLogin}>
                    <div>
                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:sm:w-[50%]' type='email' name='email' value={formdata1.email} onChange={handleChangeParent} placeholder='Enter the email.' />
                    </div>
                    <div>
                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%] md:sm:w-[50%]' type='password' name='password' value={formdata1.password} onChange={handleChangeParent} placeholder='Enter your Password.' />
                    </div>
                    <div>
                        <input className='hover:transition-all   duration-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-xl bg-green-200 text-gray-600' type='submit' value={'Login'} />
                    </div>
                </form>
                <div>Do not have an account <Link className='text-gray-900 font-semibold text-lg' to={'/signup'}>Sign Up</Link></div>
           
            </div>
            :<div className='text-center text-gray-800'>
                Logging in as Teacher. <br /> <br />
                <form className='flex  text-center flex-col gap-2' onSubmit={handleTeacherLogin}>
                    <div>
                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:sm:w-[50%]' type='email' name='email' value={formdata2.email} onChange={handleChangeTeacher} placeholder='Enter the email.' />
                    </div>
                    <div>
                        <input className='rounded-lg p-2 w-[80%] sm:w-[60%]  md:sm:w-[50%]' type='password' name='password' value={formdata2.password} onChange={handleChangeTeacher} placeholder='Enter your Password.' />
                    </div>
                    <div>
                        <input  className='hover:transition-all   duration-300 hover:bg-green-500 hover:text-white px-3 py-2 rounded-xl bg-green-200 text-gray-600' type='submit' value={'Login'} />
                    </div>
                </form>
                <div>Do not have an account <Link className='text-gray-900 font-semibold text-lg' to={'/signup'}>Sign Up</Link></div>
            </div>}
        </div>
    </div>
    </div>
    </div>
    
  )
}

export default Login