/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Table, Tag, Button,Modal } from 'antd'
import { EditOutlined ,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import axios from 'axios'
const {confirm} =Modal
export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  const FilterMenu = (menuList) => {
    return menuList.map(item => {
      if (item.childrens?.length > 0) {
        item.children = FilterMenu(item.childrens)
      }else{
        delete item.children
      }
      return item
    })
  }
  useEffect(() => {
    axios.get('http://localhost:8000/meunLists?_embed=childrens').then(res => {
      console.log(res.data);
      setdataSource(FilterMenu(res.data))
    })
  }, [])

  const delectMethod=(item)=>{
    console.log(item);
    // 当前页面同步 后端删除数据
    if (item.grade===1) {
      setdataSource(dataSource.filter(data=>data.id!==item.id))
      axios.delete(`http://localhost:8000/meunLists/${item.id}`)
    }else{
      let arr= dataSource.filter(data=>data.id===item.meunListId)
      arr[0].children=arr[0].children.filter(data=>data.id!==item.id)
      setdataSource([...dataSource])
      axios.delete(`http://localhost:8000/childrens/${item.id}`)
    }
  }
  const confirmMethod=(item)=>{
    confirm({
      title:'你确定要删除?',
      icon:<ExclamationCircleOutlined />,
      onOk(){
        console.log('ok');
        delectMethod(item)
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
      render: (item) => {
        return <div>
          <Button icon={<EditOutlined />} shape="circle" type="primary"/>
          <Button
            icon={<DeleteOutlined />}
            onClick={()=>{confirmMethod(item)}}
            shape="circle"
            style={{marginLeft:'10px'}}
            type="primary"
          />
        </div>
      }
    }
  ];
  return (
    <div>
      {/* pagination={{ pageSize:'4'}} */}
      <Table columns={columns} dataSource={dataSource} ></Table>
    </div>
  )
}
