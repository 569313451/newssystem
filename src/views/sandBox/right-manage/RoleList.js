import React, { useEffect, useState } from 'react'
import { Table,Button } from 'antd'
import axios from 'axios'
import {UnorderedListOutlined,DeleteOutlined} from '@ant-design/icons'
export default function RoleList() {
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/roles').then(res=>{
      console.log(res);
      setdataSource(res.data)
    })
  },[])

  const confirmMethod=(item)=>{
    console.log(item,15);
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'label'
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            danger icon={<DeleteOutlined />} onClick={()=>{confirmMethod(item)}} shape="circle"
          />
          <Button
            icon={<UnorderedListOutlined />} shape="circle"
            style={{marginLeft:'10px'}} type="primary"
          />
        </div>
      }
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={(item)=>item.id}></Table>
    </div>
  )
}
