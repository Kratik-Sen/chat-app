import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './hooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import getOtherUsers from './hooks/getOtherUsers'
import { useEffect } from 'react'
import {io} from 'socket.io-client'
import { serverUrl } from './main'
import { setOnlineUsers, setSocket } from './redux/userSlice'

function App() {
   getCurrentUser()
  getOtherUsers()
  let {userData,socket,onlineUsers} = useSelector(state => state.user)
  let dispatch = useDispatch()

  useEffect(()=>{//p6
    if(userData){
      const socketio = io(`${serverUrl}`,{
  query:{//whenever frontend and backend shake hand we get query
    userId : userData?._id
  }
})
dispatch(setSocket(socketio))
// setting online users
socketio.on("getOnlineUsers",(users)=>{
  dispatch(setOnlineUsers(users))
})

return ()=> socketio.close()
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
  },[userData])

  return (
   <Routes>
    <Route path='/login' element={!userData? <Login/> :  <Navigate to={'/'}/>}/>
      <Route path='/signup' element={!userData? <SignUp/> :  <Navigate to={'/profile'}/>}/>
      <Route path='/' element={userData? <Home/> :  <Navigate to={'/login'}/>}/>
      <Route path='/profile' element={userData? <Profile/> :  <Navigate to={'/signup'}/>}/>

   </Routes>
  )
}

export default App
