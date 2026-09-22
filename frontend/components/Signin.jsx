import React from 'react'
import {useState} from 'react'
import Heading from "../Small Components/Heading"
import SubHeading from '../Small Components/SubHeading'
import { InputBox } from '../Small Components/InputBox'
import ButtonCom from '../Small Components/ButtonComp'
import BottomWarning from '../Small Components/BottomWarning'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
    const [userName, setuserName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const signinBtnClickHandling =async ()=>{
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: userName,
                password: password
            })
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")

        } catch(error){
            alert(error.response.data.message)
        }
    }

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex justify-center flex-col'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label="Sign In"></Heading>
                <SubHeading label="Enter your credentials to access your account"></SubHeading>
                <InputBox placeholder={"John@gmail.com"} label={"Email"} onChange={(e)=>setuserName(e.target.value)}></InputBox>
                <InputBox placeholder={"123456"} label={"Password"} onChange={(e)=>setPassword(e.target.value)}></InputBox>
                <div className='pt-4'>
                    <ButtonCom label={"Sign In"} onClick={signinBtnClickHandling}></ButtonCom>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarning>
            </div>
        </div>
    </div>
  )
}

export default Signin