import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
import messageSlice from './messageSlice.js'

// configureStore funt create store
export const store = configureStore({
  reducer:{
    user: userSlice,
    message : messageSlice
  }
})