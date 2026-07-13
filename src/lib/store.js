import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './features/counter/counterSlice'

import user from './reducers/user'

export const store = configureStore({
  reducer: {
    user 
  },
})