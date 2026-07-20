import React from 'react'
import {useState, useEffect} from "react"
import ButtonComp from './ButtonComp'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Users = () => {
    const [users, setUsers]=useState([])
    const [search, setsearch]=useState("")
    
    useEffect(()=>{
        const fetchUsers= async ()=>{
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + search)
            setUsers(response.data.user)
        }
        fetchUsers();
    }, [search])

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input type="text" onChange={(e)=>{setsearch(e.target.value)}} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map((user) => {return <User user={user} key={user._id}/>})}
            </div>
        </>
    )
}

const User=({user})=>{
    const navigate = useNavigate()
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstname} {user.lastname}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-ful">
                <ButtonComp label={"Send Money"} onClick={()=>{navigate('/send?id='+user._id+'&name='+user.firstname)}}/>
            </div>
        </div>
    )
}

export default Users