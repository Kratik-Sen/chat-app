import React from 'react'
import SideBar from '../Components/SideBar'
import MessageArea from '../Components/MessageArea'
import getMessages from '../hooks/getMessages'

function Home() {
  getMessages()
  return (
    <div  className='w-full h-[100vh] flex '>
      <SideBar/>
      <MessageArea/>
    </div>
  )
}

export default Home