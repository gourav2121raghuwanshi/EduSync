import React from 'react'
import image2 from "../../public/hoemPageImg.jpg";
import hoemPageImg from "../../public/image1.webp";
import image1 from "../../public/image2.jpg";
import { useState } from 'react';

const Features = () => {
    const [image, setImage] = useState('one');

    return (
        <section id="features" className='w-11/12 pt-24 mx-auto hover:cursor-pointer'>
            <div className='hidden sm:flex md:flex-row flex-col  justify-between p-2 gap-3'>
                <div className='flex flex-1 flex-col gap-3'>
                    <div

                        className='text-3xl font-bold text-blue-700 mb-3'>
                        Product features
                    </div>
                    <div
                        onClick={() => setImage('one')}
                        className={`hover:scale-95 transition-all duration-200 bg-gray-200 p-3 justify-center hover:bg-gray-300 rounded-2xl flex flex-col`}
                    >
                        {/* dashboard */}
                        <svg
                            className='h-[20px] w-[20px] ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="dashboard"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path>
                        </svg>

                        <span
                            className='text-gray-600 font-semibold text-xl '
                        >Engaging Interactive Activities
                        </span>
                        <p className='text-gray-600'>
                            Integrate interactive learning activities such as quizzes, games, and educational challenges that encourage parent-child interaction and collaborative learning.
                            These activities should be educational, entertaining, and age-appropriate to captivate children's interest and foster a love for learning.   </p>
                    </div>
                    {/*  */}
                    <div
                        onClick={() => { setImage('two') }}
                        className={`hover:scale-95 transition-all duration-200 bg-gray-200 p-3 justify-center hover:bg-gray-300 rounded-2xl flex flex-col`}
                    >
                        {/* mobile integration */}
                        <div>
                            <svg
                                className='h-[20px] w-[20px] ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="dashboard"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path>
                            </svg>

                        </div>
                        <span
                            className='text-gray-600 font-semibold text-xl '
                        >  Secure Communication Platform
                        </span>
                        <p className='text-gray-600'>
                            Prioritize security and privacy by implementing robust authentication measures and encryption protocols for the communication portal. Ensure that parents and teachers can communicate confidentially while adhering to data protection regulations.    </p>
                    </div>
                    <div
                        onClick={() => setImage('three')}
                        className={`hover:scale-95 transition-all duration-200 bg-gray-200 p-3 justify-center hover:bg-gray-300 rounded-2xl flex flex-col`}


                    >
                        {/* Available on all Platforms */}
                        <div>

                            <svg
                                className='h-[20px] w-[20px] ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="dashboard"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path>
                            </svg>

                        </div>
                        <span
                            className='text-gray-600 font-semibold text-xl '
                        >Community Building Features
                        </span>
                        <p className='text-gray-600'>
                            Foster a sense of community among parents by providing discussion forums, social groups, and networking events. Encourage peer-to-peer support, knowledge sharing, and collaborative problem-solving, creating a supportive ecosystem for parents to connect and learn from each other.      </p>
                    </div>

                </div>
                {/* Part 2 */}
                <div

                    className='flex-1 py-16 flex flex-row items-center justify-center  rounded-2xl '>
                    <img
                        className='max-w-[60%] rounded-xl'

                        src={image === 'one' ? hoemPageImg : (image === 'two' ? image1 : image2)}></img>
                </div>
            </div>
            <div className=' sm:hidden my-3'>
                <div>
                    <div

                        className='text-3xl font-bold text-gray-700 mb-3'>
                        Product features
                    </div>

                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-wrap gap-3'>
                        <div
                            onClick={() => setImage('one')}
                            className='bg-blue-900  opacity-85 hover:opacity-100 text-white px-3 py-2  rounded-full'>
                            Engaging Interactive Activities
                        </div>
                        <div
                            onClick={() => setImage('two')}
                            className='bg-blue-900 opacity-85 hover:opacity-100 text-white px-3 py-2  rounded-full'>
                            Secure Communication Platform
                        </div>
                        <div
                            onClick={() => setImage('three')}
                            className='bg-blue-900 opacity-85 hover:opacity-100 text-white px-3 py-2  rounded-full'>
                            Community Building Features
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 bg-gray-200 rounded-xl p-3 shadow-lg shadow-gray-600'>
                        <div className='max-w-[80%] mx-auto'  >

                            <img
                                className=' rounded-xl'
                                src={image === 'one' ? hoemPageImg : (image === 'two' ? image1 : image2)}
                            >
                            </img>
                        </div>
                        <div className='flex flex-col justify-center gap-1 max-w-[85%] mx-auto'>
                            <span
                                className='text-lg font-semibold text-gray-700'>
                                {image === 'one' ?
                                    "Engaging Interactive Activities" : (image === 'two' ?
                                        "Secure Communication Platform" : "Community Building Features")}
                            </span>
                            <span
                                className='text-gray-600'>
                                {image === 'one' ?
                                    " Integrate interactive learning activities such as quizzes, games, and educational challenges that encourage parent-child interaction and collaborative learning. These activities should be educational, entertaining, and age-appropriate to captivate children's interest and foster a love for learning." :
                                    (image === 'two' ? " Prioritize security and privacy by implementing robust authentication measures and encryption protocols for the communication portal. Ensure that parents and teachers can communicate confidentially while adhering to data protection regulations.     " :
                                        " Foster a sense of community among parents by providing discussion forums, social groups, and networking events. Encourage peer-to-peer support, knowledge sharing, and collaborative problem-solving, creating a supportive ecosystem for parents to connect and learn from each other.           ")}
                            </span>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Features

