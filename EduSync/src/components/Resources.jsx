import React, { useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Resources = () => {
    const [posts, setposts] = useState([]);
    useEffect(()=>{
      const getResource =async () => {
        try{
          const res = await axios.get(backendUrl+"/api/blogs/get");
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
        <div className=' pt-16'>
            <div>
                <div className=' py-2 pb-5 px-2' style={{maxWidth:"1000px"}}>
                    <p className='text-5xl font-bold text-blue-800'>Online hub with resources, guides, and tips tailored to parents' needs.</p>
                </div>
                <div className='px-3'>
                    <h2 className='border-b text-xl'>Blogs</h2>
                    <div className='flex flex-col gap-2 py-1'>
                        { posts && posts?.map((post)=>{
                          return (
                          <div key={post._id} className=' border px-2 py-1 bg-slate-200'>
                            <Link to={"/blogs/"+post._id}>
                            <div className=' border-b'>
                              {/* <span className=' border-b border-neutral-700'><span > - by </span><span>{post.name}</span></span> */}
                              {post.image && 
                              <div className=' w-1/2 px-2' style={{maxWidth:"200px"}}>
                                <img className='rounded-xl' src={post?.image} width={"100%"} />
                              </div>}
                              <div>
                                <h2 className=' font-bold text-xl'>{post?.title}</h2>
                                {/* <p>{post?.description}</p> */}
                              </div>
                            </div>
                            </Link>
                           </div>
                            )}
                        )}
                    </div>
                </div>
                <div className='px-3'>
                    <h2 className='border-b text-xl'>Videos</h2>
                    <div className='flex'>
                        <div className='grid gap-3 grid-cols-1  lg:grid-cols-2'>
                            <iframe width="560" height="315"  src="https://www.youtube.com/embed/ODBr_x9FNM4?si=umU_N_TZF4J8DXw-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/XqdDMNExvA0?si=GyPhJ7ESOED4ZZ8b" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Resources