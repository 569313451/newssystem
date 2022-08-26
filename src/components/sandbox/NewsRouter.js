import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../views/sandBox/home/Home'
import RightList from '../../views/sandBox/right-manage/RightList'
import RoleList from '../../views/sandBox/right-manage/RoleList'
import UserList from '../../views/sandBox/user-manage/UserList'
import NoPermission from '../../views/NoPermission/NoPermission'

export default function NewsRouter() {
  return (
    <Routes>
      <Route element={<Home />} path="/home" />
      <Route element={<UserList />} path="/user-manage/list" />
      <Route element={<RoleList />} path="/right-manage/role/list" />
      <Route element={<RightList />} path="/right-manage/right/list" />
      <Route element={<Navigate to="/home" />} path="/" />
      <Route element={<NoPermission />} path="*" />
    </Routes>
  )
}
