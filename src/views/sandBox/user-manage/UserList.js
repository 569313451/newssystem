import React,{ useEffect, useState,useRef } from 'react'
import { Table ,Switch,Button, Modal} from 'antd'
import axios from 'axios'
import {UnorderedListOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import UserForm from '../../../components/user-manage/userForm'

export default function UserList() {
  const [dataSource,setdataSource] = useState([])
  const [roleList, setroleList] = useState([])
  const [regionList, setregionList] = useState([])
  const [open, setOpen] = useState(false);
  const addForm = useRef(null)
  const {confirm} = Modal
  useEffect(()=>{
    axios.get('http://localhost:8000/regions').then(res=>{
      setregionList(res.data)
    })
  },[])
  useEffect(()=>{
    // 用户列表
    axios.get('http://localhost:8000/users?_expand=role').then(res=>{
      setdataSource(res.data)
    })
  },[])
  useEffect(()=>{
    axios.get('http://localhost:8000/roles').then(res=>{
      setroleList(res.data)
    })
  },[])
  const addformOK= ()=> {
    addForm.current.validateFields().then(res=>{
      setOpen(false)
      axios.post('http://localhost:8000/users',{
        ...res,
        'roleState':true,
        'default':false
      }).then(list=>{
        addForm.current.resetFields()
        setdataSource([...dataSource,{...list.data,role:roleList.filter(item=>item.id==list.data.roleId)[0]}])
      })
    }).catch(err=>{
      console.log(err);
    })
  }
  const deleteMethod=(row)=>{
    confirm({
      title:'你确定要删除?',
      cancelText:'取消',
      okText:'确定',
      icon:<ExclamationCircleOutlined />,
      onOk(){
        axios.delete(`http://localhost:8000/users/${row.id}`).then(()=>{
          setdataSource(dataSource.filter(item=>item.id!=row.id))
        })
      },
      onCancel(){
        console.log('Cancel');
      }
    })
  }
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render:region=> {
        return <b>{region||'全球'}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render:(role)=>{
        return role.label
      }
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      render:(item)=>{
        return <Switch checked={item.roleState} disabled={item.default}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            danger icon={<DeleteOutlined />} onClick={()=>deleteMethod(item)} shape="circle"
          />
          <Button
            icon={<UnorderedListOutlined />} onClick={()=>{}}
            shape="circle" style={{marginLeft:'10px'}}
            type="primary"
          />
        </div>
      }
    }
  ];
  return (
    <div>
      <Button onClick={()=>{setOpen(true);}} type="primary">添加用户</Button>
      <Table columns={columns} dataSource={dataSource} pagination={{pageSize:5}} rowKey={item=>item.id}></Table>
      <Modal
        cancelText="取消"
        okText="确定"
        onCancel={() => {setOpen(false)}}
        onOk={()=>addformOK()}
        title="添加用户"
        visible={open}
      >
        <UserForm ref={addForm} regionList={regionList} roleList={roleList}></UserForm>
      </Modal>
    </div>
  )
}
