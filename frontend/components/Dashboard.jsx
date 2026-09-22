import React from 'react'
import Appbar from '../Small Components/Appbar'
import Balance from '../Small Components/Balance'
import Users from '../Small Components/Users'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const [userAccount, setUserAccount] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const getAccount = async()=>{
      try{
        const token = localStorage.getItem('token')

        const response = await axios.get('http://localhost:3000/api/v1/account/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // console.log(response.data.userAccount.userId)
        setUserAccount(response.data.userAccount)
        // console.log(userAccount)
      } catch(error){
        console.log(error.response.data.message)
        localStorage.removeItem("token")
        navigate('/signin')
      }
    }

    getAccount()

  }, [])


  if (userAccount===null) {
    return <div>Loading...</div>
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar name={`${userAccount.userId.firstname}`}/>

      <div className="max-w-6xl mx-auto p-6">
        <Balance value={`${userAccount.balance}`} />
        <div className="mt-6">
          <Users />
        </div>
      </div>
    </div>
  )
}

export default Dashboard