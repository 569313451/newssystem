import React, { useState } from 'react'
import {
  MenuFoldOutlined, UserOutlined,
  MenuUnfoldOutlined, DownOutlined
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd';
const { Header } = Layout;

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              admin
            </a>
          ),
        },
        {
          key: '4',
          danger: true,
          label: '退出',
        },
      ]}
    />
  );
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '0 16px',
      }}
    >
      {collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />}
      <div style={{ float: 'right' }}>
        <span style={{ margin: '0 10px' }}>欢迎admin回来</span>
        <Dropdown overlay={menu}>
          <Space>
            <Avatar size={32} icon={<UserOutlined />} />
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}
