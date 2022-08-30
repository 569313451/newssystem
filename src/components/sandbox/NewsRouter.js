import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../views/sandBox/home/Home'
import RightList from '../../views/sandBox/right-manage/RightList'
import RoleList from '../../views/sandBox/right-manage/RoleList'
import UserList from '../../views/sandBox/user-manage/UserList'
import NoPermission from '../../views/NoPermission/NoPermission'
import NewsAdd from '../../views/sandBox/news-manage/NewsAdd'
import NewsDraft from '../../views/sandBox/news-manage/NewsDraft'
import NewsCategory from '../../views/sandBox/news-manage/NewsCategory'
import Audit from '../../views/sandBox/audit-manage/Audit'
import AuditList from '../../views/sandBox/audit-manage/AuditList'
import Unpublished from '../../views/sandBox/publish-manage/Unpublished'
import Published from '../../views/sandBox/publish-manage/Published'
import Sunset from '../../views/sandBox/publish-manage/Sunset'
import axios from 'axios'
const LocalRouterMap= {
  '/home':<Home/>,
  '/user-manage/list':<UserList/>,
  '/right-manage/role/list':<RoleList/>,
  '/right-manage/right/list':<RightList/>,
  '/news-manage/add':<NewsAdd/>,
  '/news-manage/draft':<NewsDraft/>,
  '/news-manage/category':<NewsCategory/>,
  '/audit-manage/audit':<Audit/>,
  '/audit-manage/list':<AuditList/>,
  '/publish-manage/unpublished':<Unpublished/>,
  '/publish-manage/published':<Published/>,
  '/publish-manage/sunset':<Sunset/>
}
export default function NewsRouter() {
  // eslint-disable-next-line no-unused-vars
  const [BackRouteList,setBackRouteList]=useState([])
  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8000/menuLists'),
      axios.get('http://localhost:8000/children')
    ]).then(res=>{
      setBackRouteList([...res[0].data,...res[1].data])
      console.log([...res[0].data,...res[1].data],41);
    })
  },[])
  return (
    <Routes>
      {
        BackRouteList.map(item=>{
          return  <Route element={LocalRouterMap[item.key]} exact key={item.key} path={item.key}></Route>
        })
      }
      <Route element={<Navigate to="/home" />} path="/" />
      <Route element={<NoPermission />} path="*" />
    </Routes>
  )
}
