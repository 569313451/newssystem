import React from 'react'
import style from './Login.module.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
export default function Login(props) {
  console.log(props, 4);
  const onFinish = () => {

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
