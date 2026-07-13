import React from 'react'
import Heading from "../Small Components/Heading"
import SubHeading from '../Small Components/SubHeading'
import { InputBox } from '../Small Components/InputBox'
import ButtonCom from '../Small Components/ButtonComp'
import BottomWarning from '../Small Components/BottomWarning'


const Signin = () => {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex justify-center flex-col'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label="Sign In"></Heading>
                <SubHeading label="Enter your credentials to access your account"></SubHeading>
                <InputBox placeholder={"John@gmail.com"} label={"Email"}></InputBox>
                <InputBox placeholder={"123456"} label={"Password"}></InputBox>
                <div className='pt-4'>
                    <ButtonCom label={"Sign In"}></ButtonCom>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></BottomWarning>
            </div>
        </div>
    </div>
  )
}

export default Signin