import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      我是Layout组件
      <Outlet />
    </div>
  )
}

export default Layout
