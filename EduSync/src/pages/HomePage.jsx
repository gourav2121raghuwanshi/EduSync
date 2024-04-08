import React from 'react'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import Banner from '../../public/banner.mp4'
const HomePage = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div>
      <Navbar />
      <div>
        <div className='w-11/12 mt-5 mx-auto rounded-xl p-8'>
          <div className='flex md:flex-row flex-col justify-between items-center'>
            <div className='mx-auto text-center w-full'>
              <span className='text-blue-500   font-bold sm:text-6xl text-5xl sm:inline block'>EduSync  </span>
              <span className='font-bold  text-gray-600 sm:text-6xl text-5xl  sm:inline block'>App </span>
              <p className='mx-auto text-lg text-gray-700 mt-2 mb-2'>

                Welcome to our  centralized online platform offering diverse resources, guides, and tips tailored to parents needs, covering topics such as study techniques, homework management, and fostering a conducive learning environment at home.

              </p>
              {
                currentUser && currentUser.mode === 'teacher' &&
                <Link className='  hover:cursor-pointer text-center text-white '
                  to={'/TeacherPage'}>
                  <button className='text-start rounded-xl bg-blue-600 py-2 px-3'>Get Started</button></Link>

              }
              {
                currentUser && currentUser.mode === 'parent' &&
                <Link className='  hover:cursor-pointer text-center text-white '
                  to={'/ParentPage'}>
                  <button className='text-start rounded-xl bg-blue-600 py-2 px-3'>Get Started</button></Link>

              }

            </div>
            <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
              <video
                className=" border-opacity-25 border-4 border-blue-600"
                muted
                loop 
                autoPlay
              >
                <source src={Banner} type="video/mp4" />
              </video>
            </div>


          </div>
        </div>
      </div>
      <Features />
      <FAQ />
      <Footer />
    </div>
  )
}

export default HomePage