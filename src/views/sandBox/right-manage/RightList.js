import React, { useEffect, useState } from 'react'
import { Table, Tag, Button,Modal } from 'antd'
import { EditOutlined ,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import axios from 'axios'
const {confirm} =Modal
export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/rights').then(res => {
      console.log(res.data);
      setdataSource(res.data)
    })
  }, [])
  const confirmMethod=()=>{
    confirm({
      title:'你确定要删除?',
      icon:<ExclamationCircleOutlined />,
      onOk(){
        console.log('ok');
      },
      onCancel(){
        console.log('Cancel');
      }
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'label'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      // eslint-disable-next-line react/no-multi-comp
      render: () => {
        return <div>
          <Button icon={<EditOutlined />} shape="circle" style={{'margin-right':'10px'}} type="primary"/>
          <Button icon={<DeleteOutlined />} onClick={confirmMethod} shape="circle" type="primary"/>
        </div>
      }
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize:'4'}}></Table>
    </div>
  )
}
