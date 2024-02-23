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
        const {data} = await axios.get("/api/post/get-user-posts");
        setIsLoading(false)
        setPostData(data)
      } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data.message || "Login Failed")
        console.log("Error in reading posts from frontend", error)
      }
     
    }
    readUser();
  },[])
  const onDelete = async (id)=>{
    try {
      if(confirm("Are you sure you want to delete")){
        const previewPostData = [...postData];
        const updatePostData = postData.filter(post => post._id != id);
        setPostData(updatePostData)
        const {data} = await axios.delete('/api/post/delete-post/' +id);
        setIsLoading(false)
        toast.success("Post deleted successfully")
      }
     
    } catch (error) {
      setPostData(previewPostData)
      setIsLoading(false)
      toast.error(error.response.data.message || "Login Failed")
      console.log("Error in deleting posts from frontend", error)
    }
   
  }
  console.log(postData)
  return (
    <div>
      <div className='mb-4'>
      <DialogForm />
      </div>
       
        {
          isLoading && <h1>Loading</h1>
        }
        <div className='grid grid-cols-3 gap-6'>
          {
            postData?.map(post=>(
              <Post key={post.id} post={post} onDelete={onDelete}/>
            ))
          }

        </div>
    </div>
  )
}

export default Posts