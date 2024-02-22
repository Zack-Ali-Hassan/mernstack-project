import React, { useState } from "react";
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

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handlInputChange = (event) => {
    setFormData({...formData, [event.target.id] : event.target.value})
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
   try {
    const {data} = await axios.post('/api/register-user', formData);
    toast.success("Register Successfully")
    setIsLoading(false)
    navigate("/login")
   } catch (error) {
    setIsLoading(false)
    toast.error(error.response.data)
    console.log("Error registering from frontend " , error)
   }
  };
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Register your info to login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  onChange={handlInputChange}
                  id="username"
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handlInputChange}
                  id="email"
                  placeholder="Enter your Email"
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
              <Button>{isLoading ? "Registering" : "Register"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
