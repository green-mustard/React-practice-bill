import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'

import { RouterProvider } from 'react-router-dom'
import router from '@/router'
// 导入定制主体样式
import './theme.css'

import { Provider } from 'react-redux'
import store from '@/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
)
