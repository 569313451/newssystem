import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd';
import { withRouter } from '../../utils/withRouter'
const { Header } = Layout;

function TopHeader() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClickMenu = (e) => {
    if (e.key === '4') {
      console.log('退出');
      localStorage.removeItem('token')
      navigate('/login')
    }
  }
  const menu = (
    <Menu items={[
      {
        key: '1',
        label: (
          <a
            href="https://www.antgroup.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            admin
          </a>
        )
      },
      {
        key: '4',
        danger: true,
        label: '退出'
      }
    ]} onClick={onClickMenu}
    />
  );
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '0 16px'
      }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changeCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changeCollapsed} />
      )}
      <div style={{ float: 'right' }}>
        <span style={{ margin: '0 10px' }}>欢迎admin回来</span>
        <Dropdown overlay={menu}>
          <Space>
            <Avatar icon={<UserOutlined />} size={32} />
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}
export default withRouter(TopHeader)