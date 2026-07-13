import React from 'react'
import Appbar from '../Small Components/Appbar'
import Balance from '../Small Components/Balance'
import Users from '../Small Components/Users'


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar name={"Anku"}/>

      <div className="max-w-6xl mx-auto p-6">
        <Balance value={"1000"} />
        <div className="mt-6">
          <Users />
        </div>
      </div>
    </div>
  )
}

export default Dashboard