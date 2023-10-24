// 创建路由实例，绑定path element
import Layout from '@/pages/Layout'
import New from '@/pages/New'
import Month from '@/pages/Month'
import Year from '@/pages/Year'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        // 设置默认二级路由
        index: true,
        element: <Month />
      },
      {
        // 子级路由的path地址前不加‘/’
        path: 'year',
        element: <Year />
      }
    ]
  },
  {
    path: '/new',
    element: <New />
  }
])

export default router
