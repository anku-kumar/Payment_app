import React from 'react'
import { useState } from 'react'
import Heading from "../Small Components/Heading"
import SubHeading from '../Small Components/SubHeading'
import { InputBox } from '../Small Components/InputBox'
import ButtonComp from '../Small Components/ButtonComp'
import BottomWarning from '../Small Components/BottomWarning'
import axios from 'axios'

const Signup = () => {
    const [firstname, setFirstName]=useState("")
    const [lastname, setlastName]=useState("")
    const [username, setusername]=useState("")
    const [password, setPassword]=useState("")

    const BackendCall = async ()=>{
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            firstname,
            lastname,
            username,
            password,
        })
        localStorage.setItem("token", response.data.token)
    }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label="Sign up"></Heading>
                <SubHeading label={"Enter your information to create an account"}></SubHeading>
                <InputBox placeholder={"John"} label={"First Name"} onChange={(e)=>{setFirstName(e.target.value)}}></InputBox>
                <InputBox placeholder={"Doe"} label={"Last Name"} onChange={(e)=>{setlastName(e.target.value)}}></InputBox>
                <InputBox placeholder={"John@gmail.com"} label={"Email"} onChange={(e)=>{setusername(e.target.value)}}></InputBox>
                <InputBox placeholder={"123456"} label={"Password"} onChange={(e)=>{setPassword(e.target.value)}}></InputBox>
                <div className="pt-4">
                    <ButtonComp label={"Sign up"} onClick={BackendCall}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
  )
}

export default Signup