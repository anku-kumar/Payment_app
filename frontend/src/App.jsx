import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import Dashboard from '../components/Dashboard'
import SendMoney from '../components/SendMoney'
import SuccessPage from '../components/SuccessPage'

function App() {

  return (
    <>
      {/* <div className='flex align-center justify-center bg-gray-500 w-full h-screen'> */}
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/send' element={<SendMoney/>}/>
            <Route path='/success' element={<SuccessPage/>}/>
          </Routes>
        </BrowserRouter>
      {/* </div> */}
    </>
  )
}

export default App
