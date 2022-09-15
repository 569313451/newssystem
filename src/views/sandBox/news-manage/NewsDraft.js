import React, { useEffect, useState } from 'react'
import {  Table } from 'antd'
import axios from 'axios'
export default function NewsDraft() {
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
    // 获取草稿箱数据
    axios.get('http://localhost:8000/news?author=admin&auditState=0').then(res=>{
      console.log(res.data);
      setdataSource(res.data)
    })
  },[])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title'
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={(item)=>item.id}></Table>
    </div>
  )
}
