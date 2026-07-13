import React from 'react'
import {useState, useEffect} from "react"
import ButtonComp from './ButtonComp'
import axios from "axios"

const Users = () => {
    const [users, setUsers]=useState([])
    
    useEffect(()=>{
        const fetchUsers= async ()=>{
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk")
            setUsers(response.data.user)
            // console.log(response.data.user)
        }
        // fetchUsers();
    }, [users])

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map((user) => {return <User user={user} key={user._id}/>})}
            </div>
        </>
    )
}

const User=({user})=>{
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-ful">
                <ButtonComp label={"Send Money"} />
            </div>
        </div>
    )
}

export default Users