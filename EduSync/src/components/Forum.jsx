import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar';

const Forum = () => {
    const [posts, setposts] = useState([]);
    useEffect(()=>{
      const getResource =async () => {
        try{
          const res = await axios.get(backendUrl+"/api/resources/get");
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
          <Link className='button px-2 py-1 rounded-xl bg-green-300 hover:bg-green-500 mr-2' to="createForum">+ Create Post</Link>
        </div>
        <div className='flex flex-col gap-2 py-1'>
            { posts && posts?.map((post)=>{
              return (
              <div key={post._id} className=' border px-2 py-1 bg-slate-200'>
                <div className='flex border-b'>
                  {/* <span className=' border-b border-neutral-700'><span > - by </span><span>{post.name}</span></span> */}
                  {post.image && 
                  <div className=' w-1/2 px-2' style={{maxWidth:"200px"}}>
                    <img className='rounded-xl' src={post.image} width={"100%"} />
                  </div>}
                  <div>
                    <h2 className=' font-bold text-xl'>{post?.title}</h2>
                    <p>{post?.description}</p>
                  </div>
                </div>
                
                {post.replies?.map(reply =>{
                  return (
                    <div className='flex mx-3 my-2'>
                      <div className=' w-4'><img src='/reply.png' /></div>
                      <div className='border-b w-full px-2'>
                      <h2 className=' font-bold'>{reply.name}</h2>
                        <p>{reply.text}</p>
                      </div>
                    </div>
                  )
                })
                }
                <div className='mx-3 my-2 text-right'>
                  <Link to={"reply/"+post._id} className='border button rounded-xl px-3 py-1 '>Reply</Link>
                </div>
              </div>
              )
            })}
        </div>
    </div>
  )
}

export default Forum