import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import image from '../../public/education.svg'
import axios from 'axios';
import { signoutUserStart, signoutUserSuccess, signoutUserFailure } from '../redux/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useSelector(state => state.user);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
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

    <nav className='w-full  z-10 mx-auto   '>
      <div className='flex flex-row  items-center justify-between mx-auto bg-blue-800  py-4  px-7 shadow-lg'>
        <div className='flex flex-row  gap-3 items-center'>
          <Link to="/"
            onClick={closeDropdown}>
            <div className='flex flex-row justify-center items-center gap-1'>
              <img src={image} className='h-[25px] w-[25px]'></img>
              <span className='text-blue-400 font-bold sm:text-3xl text-xl'>

                Edusync</span>
            </div>
          </Link>
          {
            currentUser && currentUser.mode === 'teacher' && <button className='hidden hover:cursor-pointer text-white sm:block'>
              <Link className='hover:text-gray-900 duration-200 transition-all' to='/TeacherPage'  >Your Courses</Link>
            </button>
          }
          {
            currentUser && currentUser.mode === 'teacher' && <button className='hidden hover:cursor-pointer text-white sm:block'>
              <Link className='hover:text-gray-900 duration-200 transition-all' to='/createCourse' >Create Course</Link>
            </button>
          }
          {
            currentUser && currentUser.mode === 'parent' && <button className='hidden hover:cursor-pointer text-white sm:block'>
              <Link className='hover:text-gray-900 duration-200 transition-all' to='/ParentPage'  >Your Courses</Link>
            </button>
          }
          {
            currentUser && currentUser.mode === 'parent' && <button className='hidden hover:cursor-pointer text-white sm:block'>
              <Link className='hover:text-gray-900 duration-200 transition-all' to='/join-course' >Join Course</Link>
            </button>
          }
          {/* <button className='hidden hover:cursor-pointer text-white sm:block'>
              <Link className='hover:text-gray-900 duration-200 transition-all' to='/forum' >Forum/Ask</Link>
          </button>
          <button className='hidden hover:cursor-pointer text-white sm:block'>
              <Link className='hover:text-gray-900 duration-200 transition-all' to='/blogs' >Blogs</Link>
          </button>
          <button className='hidden hover:cursor-pointer text-white sm:block'>
              <Link className='hover:text-gray-900 duration-200 transition-all' to='/resource' >Resources</Link>
          </button>
          <button className='hidden hover:cursor-pointer text-white sm:block'>
              <Link className='hover:text-gray-900 duration-200 transition-all' to='/webinar' >Webinars</Link>
          </button> */}
        </div>
        {/* part 2 */}

        <div className='flex flex-row gap-3    items-center'>
          {/* {
            currentUser && <span onClick={handleSignOut} className='text-gray-100 text-lg hidden sm:block  sm:text-xl md:text-2xl font-semibold cursor-pointer'>Sign Out</span>
          } */}
          {
            !currentUser && <div className='flex flex-row gap-3   items-center'>
              <div className='hidden sm:flex flex-row'>
                <Link to={'login'} >
                  <div className='font-semibold text-white bg-gray-700 rounded-xl py-1 px-3' >Login</div>
                </Link>
              </div>
              <div className='hidden sm:block'>
                <Link to={'signup'} >
                  <div className=' px-3 py-1 no-underline  rounded-xl bg-blue-400 text-gray-800 font-semibold'> Sign up</div>
                </Link>
              </div>
            </div>
          }
          {/* dropdown */}
          <div className="relative inline-block   text-left">
            <button
              onClick={toggleDropdown}
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400 border-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {
              isDropdownOpen && (
                <div className="origin-top-right flex flex-col gap-3 p-4 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className='flex flex-col gap-3'>

                    {
                      currentUser && currentUser.mode === 'parent' && <Link
                        className='bg-blue-300 rounded-xl sm:hidden px-2 py-1 text-gray-700 font-semibold text-center'
                        to={'/ParentPage'}
                        onClick={closeDropdown}>
                        Your Courses
                      </Link>
                    }
                    {
                      currentUser && currentUser.mode === 'parent' && <Link

                        className='bg-blue-300 sm:hidden rounded-xl px-2 py-1 text-gray-700 font-semibold text-center '
                        to={'/join-course'}
                        onClick={closeDropdown}>
                        Join Course
                      </Link>
                    }
                    {
                      currentUser && currentUser.mode === 'teacher' && <Link

                        className='bg-blue-300 sm:hidden rounded-xl px-2 py-1 text-gray-700 font-semibold text-center'
                        to={'/TeacherPage'}
                        onClick={closeDropdown}>
                        Your Courses
                      </Link>
                    }

                   {
                      currentUser && currentUser.mode === 'teacher' && <Link

                        className='bg-blue-300 sm:hidden rounded-xl px-2 py-1 text-gray-700 font-semibold text-center'
                        to={'/createCourse'}
                        onClick={closeDropdown}>
                        Create Course
                      </Link>
                    } 
                    <Link
                        className='bg-blue-300 rounded-xl px-2 py-1 text-gray-700 font-semibold text-center'
                        to={'/forum'}
                        onClick={closeDropdown}>
                        Forum/Ask
                    </Link>
                    <Link
                        className='bg-blue-300 rounded-xl px-2 py-1 text-gray-700 font-semibold text-center'
                        to={'/blogs'}
                        onClick={closeDropdown}>
                        Blogs
                    </Link>
                    <Link
                        className='bg-blue-300 rounded-xl px-2 py-1 text-gray-700 font-semibold text-center'
                        to={'/resource'}
                        onClick={closeDropdown}>
                        Resources
                    </Link>
                    <Link
                        className='bg-blue-300 rounded-xl px-2 py-1 text-gray-700 font-semibold text-center'
                        to={'/profile'}
                        onClick={closeDropdown}>
                        Profile
                    </Link>
                    
                    {
                      currentUser && <span onClick={handleSignOut} className='text-red-500 text-center text-lg sm:text-xl md:text-2xl font-semibold cursor-pointer'>Sign Out</span>
                    }
                  </div>
                  {
                    !currentUser && <div
                      className="py-1 flex flex-col justify-center gap-3"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >

                      <Link
                        onClick={closeDropdown}
                        to="/signup"
                        className="block px-4 text-center  py-2 text-sm text-white rounded-2xl  bg-blue-400  hover:bg-blue-500" role="menuitem">
                        Sign up
                      </Link>
                      <Link
                        onClick={closeDropdown}
                        to="/login"
                        className="block px-4 text-center py-2 text-sm text-white  hover:bg-gray-700 rounded-2xl  bg-gray-600" role="menuitem">
                        Sign in
                      </Link>
                    </div>
                  }
                </div>
              )}
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar