import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ParentPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const id = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/parent/getAllcourses/${currentUser._id}`);
        const data = res.data;
        setCourses(data);
      } catch (err) {
        console.log("Cannot get courses");
      }
    };
    getCourse();
  }, []);

  return (
    <>
      <Navbar />
      <div className='p-3 '>
        <div className='sm:grid  w-10/12 mx-auto flex flex-col  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 '>
          {courses.map((course, index) => (
            <Link
            to={`/displaySingleCourseForParent/${course._id}`}
              key={index}
              className='flex flex-col bg-blue-200 rounded-lg p-4'>
              <h2 className='font-semibold text-xl text-gray-800'>{course.title}</h2>
              <p className='text-lg text-gray-700'>{course.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ParentPage;
