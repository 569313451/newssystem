import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
import NoPermission from '../NoPermission/NoPermission'
import { Layout } from 'antd';
import './NewsSandBox.css'
const { Content } = Layout
export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow:'auto'
          }}
        >
          <Routes>
            <Route element={<Home />} path="/home" />
            <Route element={<UserList />} path="/user-manage/list" />
            <Route element={<RoleList />} path="/right-manage/role/list" />
            <Route element={<RightList />} path="/right-manage/right/list" />
            <Route element={<Navigate to="/home" />} path="/" />
            <Route element={<NoPermission />} path="*" />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}
