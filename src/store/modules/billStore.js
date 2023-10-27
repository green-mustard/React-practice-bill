// 编写账单列表相关的store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: []
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    }
  }
})

// 解构Action Creator函数
const { setBillList } = billStore.actions
const fetchBillList = () => {
  return async dispatch => {
    // 编写异步请求
    const res = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(res.data))
  }
}

export { fetchBillList }

export default billStore.reducer
