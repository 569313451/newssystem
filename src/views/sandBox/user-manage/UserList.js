import React,{ useEffect, useState } from 'react'
import { Table ,Switch,Button, Form, Input, Modal,Select} from 'antd'
import axios from 'axios'
import {UnorderedListOutlined,DeleteOutlined} from '@ant-design/icons'

export default function UserList() {
  const [dataSource,setdataSource] = useState([])
  const [roleList, setroleList] = useState([])
  const [regionList, setregionList] = useState([])
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  useEffect(()=>{
    // 用户列表
    axios.get('http://localhost:8000/users?_expand=role').then(res=>{
      setdataSource(res.data)
    })
  },[])
  useEffect(()=>{
    axios.get('http://localhost:8000/regions').then(res=>{
      setregionList(res.data)
      console.log(regionList);
    })
  },[])
  useEffect(()=>{
    axios.get('http://localhost:8000/roles').then(res=>{
      setroleList(res.data)
      console.log(roleList);
    })
  },[])
  const columns = [
    {
      title: '区域',
      dataIndex: 'regin',
      render:regin=>{
        return <b>{regin||'全球'}</b>
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
            danger icon={<DeleteOutlined />} onClick={()=>{console.log(item);}} shape="circle"
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
  // const onCreate = (values) => {
  //   console.log('Received values of form: ', values);
  //   setOpen(false);
  // };
  return (
    <div>
      <Button onClick={()=>{setOpen(true);}} type="primary">添加用户</Button>
      <Table columns={columns} dataSource={dataSource} rowKey={item=>item.id}></Table>
      <Modal
        cancelText="Cancel"
        okText="Create"
        onCancel={() => {setOpen(false)}}
        onOk={() => {console.log('add')}}
        title="添加用户"
        visible={open}
      >
        <Form form={form} {...{labelCol: { span: 4 },wrapperCol: { span: 20 }}}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{required: true,message: '用户名必填'}]}
          >
            <Input placeholder="请填写用户名"/>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{required: true,message: '密码必填'}]}
          >
            <Input placeholder="请填写密码" type="password"/>
          </Form.Item>
          <Form.Item
            label="区域"
            name="region"
            rules={[{required: true,message: '区域必填'}]}
          >
            <Select
              allowClear
              onChange={(item)=>{console.log(item);}}
              placeholder="请选择区域范围"
            >
              {
                regionList.map(item=>{
                  return <Option key={item.id} value={item.vaule}>{item.title}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleId"
            rules={[{required: true,message: '角色必填'}]}
          >
            <Select
              allowClear
              onChange={(item)=>{console.log(item);}}
              placeholder="请选择角色"
            >
              {
                roleList.map(item=>{
                  return <Option key={item.id} value={item.id}>{item.label}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
