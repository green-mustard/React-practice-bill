import { configureStore } from '@reduxjs/toolkit'
import billReducer from '@/store/modules/billStore'

export default configureStore({
  reducer: {
    bill: billReducer
  }
})
