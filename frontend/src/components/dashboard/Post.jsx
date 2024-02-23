import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import DialogForm from "./DialogForm";

function Post({ post,onDelete }) {
 

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.content}</CardDescription>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto mt-4"
            />
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <DialogForm buttonTitle="Updated Post" postToEdit ={post}/>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={()=> onDelete(post._id)}
            >
              Delete
            </Button>
          </div>
        </CardHeader>
        {/* <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default Post;
