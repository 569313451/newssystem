import React from 'react'
import style from './Login.module.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
  const navigate = useNavigate();

  const onFinish = (e) => {
    console.log(e, 8);
    axios.get('http://localhost:8000/users?username='
      + e.username
      + '&password='
      + e.password
      + '&roleState=true&_expand=role')
      .then(res => {
        console.log(res.data, 10);
        if (res.data.length === 0) {
          message.error('用户名或密码不匹配！')
        } else {
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          navigate('/')
        }
      })
  }
  return (
    <div >
      <div className={`${style.bgBlur}`} />
      <div className={`${style.content}`}>
        <div className={`${style.title}`}>发布管理</div>
        <Form
          className="login-form"
          name="normal_login"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ width: '100%' }} type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}
