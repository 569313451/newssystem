import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../views/sandBox/home/Home'
import RightList from '../../views/sandBox/right-manage/RightList'
import RoleList from '../../views/sandBox/right-manage/RoleList'
import UserList from '../../views/sandBox/user-manage/UserList'
import NoPermission from '../../views/sandBox/NoPermission/NoPermission'
import NewsAdd from '../../views/sandBox/news-manage/NewsAdd'
import NewsDraft from '../../views/sandBox/news-manage/NewsDraft'
import NewsCategory from '../../views/sandBox/news-manage/NewsCategory'
import Audit from '../../views/sandBox/audit-manage/Audit'
import AuditList from '../../views/sandBox/audit-manage/AuditList'
import Unpublished from '../../views/sandBox/publish-manage/Unpublished'
import Published from '../../views/sandBox/publish-manage/Published'
import Sunset from '../../views/sandBox/publish-manage/Sunset'
import axios from 'axios'
const LocalRouterMap = {
  '/home': <Home />,
  '/user-manage/list': <UserList />,
  '/right-manage/role/list': <RoleList />,
  '/right-manage/right/list': <RightList />,
  '/news-manage/add': <NewsAdd />,
  '/news-manage/draft': <NewsDraft />,
  '/news-manage/category': <NewsCategory />,
  '/audit-manage/audit': <Audit />,
  '/audit-manage/list': <AuditList />,
  '/publish-manage/unpublished': <Unpublished />,
  '/publish-manage/published': <Published />,
  '/publish-manage/sunset': <Sunset />
}

export default function NewsRouter() {
  const [BackRouteList, setBackRouteList] = useState([])
  const { role: { rights } } = JSON.parse(localStorage.getItem('token'))
  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && item.pagepermisson
  }
  const checkUserPermission = (item) => {
    return rights.includes(item.key)
  }
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8000/menuLists'),
      axios.get('http://localhost:8000/children')
    ]).then(res => {
      setBackRouteList([...res[0].data, ...res[1].data])
    })
  }, [])
  return (
    <Routes>
      {
        BackRouteList.map(item => {
          if (checkRoute(item) && checkUserPermission(item)) {
            return <Route element={LocalRouterMap[item.key]} exact key={item.key} path={item.key}></Route>
          } else {
            return null
          }
        })
      }
      <Route element={<Navigate to="/login" />} path="/" />
      {
        BackRouteList.length > 0 && <Route element={<NoPermission />} path="*" />
      }
    </Routes>
  )
}
