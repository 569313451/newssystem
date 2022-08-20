import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandBox/NewsSandBox'

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<NewsSandBox />} path="/*" />
      </Routes>
    </HashRouter>
  )
}
