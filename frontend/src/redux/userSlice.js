import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user", // set slice name
  initialState: { // set initialState 
    userData : null, // setUserData("kratik")
    otherUsers : null,
    selectedUser : null,
    socket : null,
    onlineUsers : null,
    searchData : null

  }, 

  // now we create reducer which can change state of 
  reducers:{
    setUserData : (state,action)=>{
    state.userData = action.payload //payload fancy name data ke liye
    },
     setOtherUsers : (state,action)=>{
    state.otherUsers = action.payload
    },
     setSelectedUsers : (state,action)=>{
    state.selectedUser = action.payload
    },
     setSocket: (state,action)=>{
    state.socket = action.payload
    },
     setOnlineUsers : (state,action)=>{
    state.onlineUsers = action.payload
    },
     setSearchData : (state,action)=>{
    state.searchData = action.payload
    },

  }
})

export const {setUserData , setOtherUsers,setSelectedUsers ,setSocket,setOnlineUsers , setSearchData} = userSlice.actions
export default userSlice.reducer