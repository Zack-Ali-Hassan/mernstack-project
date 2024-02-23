import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Post({ post }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.content}</CardDescription>
         {post.image &&  <img src={post.image} alt={post.title} className="w-full h-auto mt-4"/>}
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
