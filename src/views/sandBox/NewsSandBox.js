import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import NewsRouter from '../../components/sandbox/NewsRouter';
import { Layout } from 'antd';
import './NewsSandBox.css'
const { Content } = Layout
export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content className="site-layout-background">
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
  )
}
