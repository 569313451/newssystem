import React from 'react'
import { Button } from 'antd';
// import axios from 'axios'
export default function Home() {
  const ajax = () => {
    // 获取数据
    // axios.get('http://localhost:8000/meunLists').then(res => {
    //   console.log(res, 8);
    // })

    // 添加数据
    // axios.post('http://localhost:8000/meunLists', { id: '1', key: '/left-manage/role/list', label: '测试', icon: "<UserOutlined />" },)

    // 更新 修改 put 传参替换掉原有数据
    // axios.put("http://localhost:8000/meunLists/1", { label: '测试修改' })

    // 更新 补丁
    // axios.patch("http://localhost:8000/meunLists/1", { label: '测试222' })

    // 删除
    // axios.delete("http://localhost:8000/meunLists/1")

    // _embed //向下关联 表数据
    // axios.get('http://localhost:8000/meunLists?_embed=comments').then(res=>{
    //   console.log(res,25);
    // })

    // _expand  //
    // axios.get("http://localhost:8000/comments?_expand=meunList").then(res => {
    //   console.log(res, 30);
    // })

  }
  return (
    <div>
      <Button type='primary' onClick={ajax}>Button</Button>
    </div>
  )
}
