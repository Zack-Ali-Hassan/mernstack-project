import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import axios from "axios";

function DialogForm({buttonTitle, postToEdit,refresh}) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imagePost, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const isEditing = postToEdit != null;
    useEffect(()=>{
      if(isEditing){
        setTitle(postToEdit.title)
        setContent(postToEdit.content)
        setPreview(postToEdit.image)
      }
    },[])
    const HandleImageChange = (e)=>{
      let file =e.target.files[0];
      if(file){
        setImage(file);
        setPreview(URL.createObjectURL(file))
      }
    }
    const HandleSubmit = async (e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if(imagePost){
        formData.append('image', imagePost);
      }
      setIsLoading(true)
      try {
        let response;
        if(isEditing){

          response = await axios.post("/api/post/update-post/" + postToEdit._id,formData,{
            headers: {'Content-Type': 'multipart/form-data'}
          })
          toast.success("Post Updated successfully")
        }
        else{
          response = await axios.post("/api/post/register-post",formData,{
            headers: {'Content-Type': 'multipart/form-data'}
          })
          toast.success("Post Registerating successfully")
        }
        setTitle('');
        setContent('');
        setImage(null);
        setPreview('');
       
        setIsLoading(false)
      } catch (error) {
        toast.error(error.response.data)
        console.log("Creating post error :" + error)
        setIsLoading(false)
      }
    }
  return (
    <div className="">
      <Dialog>
        <DialogTrigger><Button>{buttonTitle ? "Update Post" : "Create New Post"} </Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Create new post to publish you acount and see to the world...
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={HandleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
              value={title}
                id="title"
                placeholder="Enter your title"
                onChange ={(e)=> setTitle(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Input
              value={content}
                type="text"
                id="content"
                placeholder="Enter your content"
                onChange ={(e)=> setContent(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                id="image"
                accept ="image/*"
                placeholder="Enter your image"
                onChange ={HandleImageChange}
              />
              <div className="flex justify-center">
              {preview && <img src={preview} className="w-[250px] h-[250px]" alt="preview"/>}
              </div>
              
            </div>
            <Button type="submit">{isLoading ? "Registering Post....." : "Submit Post"}</Button>
          </div>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogForm;
