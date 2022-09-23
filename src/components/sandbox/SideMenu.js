import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from '../../utils/withRouter'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  ChromeOutlined, AuditOutlined, DeleteOutlined, CloudUploadOutlined,
  UserOutlined, OrderedListOutlined, CloudSyncOutlined, CheckSquareOutlined,
  AlignCenterOutlined, PartitionOutlined, EditOutlined, SnippetsOutlined, DiffOutlined
} from '@ant-design/icons';
const { Sider } = Layout;


const iconList = {
  '/home': <ChromeOutlined />,
  '/user-manage': <UserOutlined />,
  '/user-manage/list': <AlignCenterOutlined />,
  '/right-manage': <PartitionOutlined />,
  '/right-manage/role/list': <AlignCenterOutlined />,
  '/right-manage/right/list': <AlignCenterOutlined />,
  '/news-manage': <CheckSquareOutlined />,
  '/news-manage/add': <EditOutlined />,
  '/news-manage/draft': <SnippetsOutlined />,
  '/news-manage/category': <OrderedListOutlined />,
  '/audit-manage': <AuditOutlined />,
  '/audit-manage/audit': <AlignCenterOutlined />,
  '/audit-manage/list': <AlignCenterOutlined />,
  '/publish-manage': <DiffOutlined />,
  '/publish-manage/unpublished': <CloudSyncOutlined />,
  '/publish-manage/published': <CloudUploadOutlined />,
  '/publish-manage/sunset': <DeleteOutlined />
}
function SideMenu() {
  let [menu, setMenu] = useState([])
  let navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    axios.get('http://localhost:8000/menuLists?_embed=children').then(res => {
      // eslint-disable-next-line no-use-before-define
      let ResData = renderMenu(res.data)
      setMenu(ResData)
    })
  }, [])
  const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
  const checkPagePermission = (item) => {
    return rights.includes(item.key)
  }
  const renderMenu = (menuList) => {
    let arr = menuList.map(item => {
      if (item.pagepermisson === 1 && checkPagePermission(item)) {
        // 未使用的属性报错???==>过滤属性
        item = {
          id: item.id,
          key: item.key,
          label: item.label,
          icon: iconList[item.key],
          children: item.children
        }
        if (item.children?.length > 0 && checkPagePermission(item)) {
          item.children = renderMenu(item.children)
        } else {
          delete item.children
        }
        return item
      } else {
        // eslint-disable-next-line array-callback-return
        return
      }
    })
    console.log(arr, 60);
    return arr
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
