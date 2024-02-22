import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import axios from "axios";
  import toast from "react-hot-toast";
  import { useNavigate } from "react-router-dom";
import { useUser } from '@/hooks/useUser';
function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const {login, user} =useUser();
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();
      useEffect(()=>{
        if(user) navigate("/")
      },[user])
      const handlInputChange = (event) => {
        setFormData({...formData, [event.target.id] : event.target.value})
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
       try {
        const {data} = await axios.post('/api/user/login-user', formData);
        toast.success("Login Successfully")
        console.log("data are : " + data)
        login(data,data.expiresIn)
        setIsLoading(false)
        navigate("/")
       } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data)
        console.log("Error login user from frontend " , error)
       }
      };
  return (
    <div className="w-full">
    <Card>
      <CardHeader>
        <CardTitle className="justify-center flex">Login System</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={handlInputChange}
                id="email"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={handlInputChange}
                type="password"
                id="password"
                placeholder="Enter your Password"
              />
            </div>
            <Button>{isLoading ? "Login....." : "Login"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}

export default Login