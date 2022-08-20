import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from '../../utils/withRouter'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  ChromeOutlined,
  UserOutlined,
  AlignCenterOutlined
} from '@ant-design/icons';
const { Sider } = Layout;


const iconList = {
  '/home': <ChromeOutlined />,
  '/user-manage': <UserOutlined />,
  '/user-manage/list': <AlignCenterOutlined />,
  '/right-manage': <UserOutlined />,
  '/right-manage/role/list': <UserOutlined />,
  '/right-manage/right/list': <UserOutlined />
}
function SideMenu() {
  let [menu, setMenu] = useState([])
  let navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    axios.get('http://localhost:8000/meunLists').then(res => {
      // eslint-disable-next-line no-use-before-define
      setMenu(renderMenu(res.data))
    })
  }, [])
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.pagepermisson === 1) {
        item.icon = iconList[item.key]
        if (item.children?.length > 0) {
          item.children = renderMenu(item.children)
        }
        return item
      } else {
        // eslint-disable-next-line array-callback-return
        return
      }
    })
  }
  const SelectedKeys = [location.pathname]
  const OpenKeys = ['/' + location.pathname.split('/')[1]]
  return (
    <div>
      <Sider collapsed={false} collapsible trigger={null}>
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
          <div className="logo" >发布管理</div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Menu defaultOpenKeys={OpenKeys} items={menu} mode="inline"
              onClick={(item) => {
                navigate(item.key)
              }}
              selectedKeys={SelectedKeys}
              theme="dark"
            />
          </div>
        </div>
      </Sider >
    </div >
  )
}
export default withRouter(SideMenu)
