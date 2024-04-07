import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar';

const Webinars = () => {
    const [posts, setposts] = useState([]);
    useEffect(()=>{
      const getResource =async () => {
        try{
          const res = await axios.get(backendUrl+"/api/webinars/get");
          const data = await res.data;
          setposts(data);
          console.log(data);
        }
        catch(err){
          console.log(err);
        }
      }
      getResource();

    },[])
  return (
    <div>
      <Navbar />
        <div className=' mt-3 mb-1 text-right'>
            <Link className='button px-2 py-1 rounded-xl bg-green-300 hover:bg-green-500' to="create">+ Create Webinar</Link>
        </div>
        <div className='flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-1 px-3' style={{maxWidth:"1100px"}}>
            { posts && posts?.map((post)=>{
              return (
              <div key={post._id} className=' border px-2 py-1 bg-gradient-to-r from-indigo-300  to-purple-300 rounded-xl '>
                <div className=''>
                  <h2 className=' font-bold text-2xl text-fuchsia-900'>{post?.title}</h2>
                  <p className=' text-gray-700'>{post?.description}</p>
                  <div><span className='font-bold'> Topics : </span> <p className=' bg-blue-200 inline px-2 rounded-lg'>{post?.topics}</p> </div>
                  <div><span className='font-bold'> Hosts : </span> <p className=' bg-blue-200 inline px-2 rounded-lg'>{post?.host}</p> </div>
                  <div><span className='font-bold'> Time : </span> <p className='  inline px-2 rounded-lg'>{post?.time}</p> </div>
                  {post.link &&
                    <div className='border flex rounded px-2 py-1'>
                    <div>{post.link}</div>
                    <div className='mx-3 my-2 text-right'>
                        <Link to={post.link} className='border button rounded-xl px-3 py-1 '>Join</Link>
                    </div>
                  </div>}
                </div>
                
              </div>
              )
            })}
        </div>
        </div>
    </div>
  )
}

export default Webinars