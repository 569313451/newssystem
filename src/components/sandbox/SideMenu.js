import React from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from '../../utils/withRouter'
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;

// 模拟数组结构
const meunList = [
  { key: '/home', label: '首页', icon: <UserOutlined /> },
  {
    key: '/user-manage', label: '用户管理', icon: <UserOutlined />,
    children: [
      { key: '/user-manage/list', label: '用户列表', icon: <UserOutlined /> }
    ]
  },
  {
    key: '/right-manage', label: '权限管理', icon: <UserOutlined />,
    children: [
      { key: '/right-manage/role/list', label: '角色列表', icon: <UserOutlined /> },
      { key: '/right-manage/right/list', label: '权限列表', icon: <UserOutlined /> }
    ]
  },
]

function SideMenu(props) {
  console.log(props, 29);
  let navigate = useNavigate();
  return (
    <div>
      <Sider trigger={null} collapsible collapsed={false}>
        <div className="logo" >发布管理</div>
        <Menu theme='dark' mode='inline' items={meunList} onClick={(item, key, keyPath, domEvent) => {
          console.log(props,item, key, keyPath, domEvent, 25);
          navigate(item.key)
        }}></Menu>
      </Sider>
    </div>
  )
}
export default withRouter(SideMenu)
