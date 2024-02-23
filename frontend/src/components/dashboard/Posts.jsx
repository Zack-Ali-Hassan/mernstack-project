import React, { useEffect, useState } from 'react'
import Post from './Post'
import DialogForm from './DialogForm'
import axios from 'axios'
import toast from 'react-hot-toast'

function Posts() {
  const[postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    const readUser = async ()=>{
      setIsLoading(true);
      try {
        const {getPosts} = await axios.get("/api/post/get-user-posts");
        setIsLoading(false)
        setPostData(getPosts)
      } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data)
        console.log("Error in reading posts from frontend", error)
      }
     
    }
    readUser();
  },[])
  return (
    <div>
        <DialogForm/>
        {
          isLoading && <h1>Loading</h1>
        }
        <div className='grid grid-cols-3 gap-4'>
          {
            postData?.map((post)=>(
              <Post key={post.id} post={post}/>
            ))
          }

        </div>
    </div>
  )
}

export default Posts