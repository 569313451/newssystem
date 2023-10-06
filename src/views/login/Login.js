import React, { useEffect, useState } from 'react';
import style from './Login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
  const [form] = Form.useForm();
  const [values, setValues] = useState({
    username: 'admin',
    password: '000000',
  });
  const navigate = useNavigate();
  const onFinish = (e) => {
    console.log(values, e, 8);
    axios
      .get(
        `http://localhost:8000/users?username=${e.username}&password=${e.password}&roleState=true&_expand=role`,
      )
      .then((res) => {
        console.log(res.data, 10);
        if (res.data.length === 0) {
          message.error('用户名或密码不匹配！');
        } else {
          localStorage.setItem('token', JSON.stringify(res.data[0]));
          navigate('/home');
        }
      });
  };
  useEffect(() => {
    if (!values.username) {
      setValues({ username: 'admin' });
    }
    if (!values.password) {
      setValues({ password: '000000' });
    }
  }, [values]);
  return (
    <div>
      <div className={`${style.bgBlur}`} />
      <div className={`${style.content}`}>
        <div className={`${style.title}`}>cms</div>
        <Form
          className='login-form'
          form={form}
          name='normal_login'
          onFinish={onFinish}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input
              onChange={(e) =>
                form.setFieldsValue({ username: e.target.value })
              }
              placeholder='Username'
              prefix={<UserOutlined className='site-form-item-icon' />}
              value={values.username}
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码!' }]}>
            <Input
              onChange={(e) =>
                form.setFieldsValue({ password: e.target.value })
              }
              placeholder='Password'
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              value={values.password}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' style={{ width: '100%' }} type='primary'>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
