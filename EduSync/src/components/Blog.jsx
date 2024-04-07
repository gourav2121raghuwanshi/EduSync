import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

import {useParams} from 'react-router-dom'

const Blog = () => {
    const {id} = useParams();
    const [post, setpost] = useState([]);
    useEffect(()=>{
      const getResource =async () => {
        try{
          const res = await axios.get(backendUrl+"/api/blogs/get/"+id);
          const data = await res.data;
          setpost(data);
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
        <div className=''>
        <div className=' border px-4 py-1 '>
            <div className=' '>
              {/* <span className=' border-b border-neutral-700'><span > - by </span><span>{post.name}</span></span> */}
              {post.image && 
              <div className=' w-1/2 px-2' style={{maxHeight:"50vh"}}>
                <img className='rounded-xl' src={post?.image}  style={{maxHeight:"50vh"}} />
              </div>}
              <br />
              <div>
                <h2 className=' font-bold text-xl'>{post?.title}</h2>
                <p>{post?.description}</p>
              </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Blog