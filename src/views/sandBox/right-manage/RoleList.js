import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'
export default function RoleList() {
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/roles').then(res=>{
      console.log(res);
      setdataSource(res.data)
    })
  },[])
  const columns = [
    {
      title: '姓名',
      dataIndex: 'label',
      key: 'label'
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  )
}
