/* eslint-disable react/prop-types */
import React, { useState,forwardRef } from 'react';
import { Form, Input, Select } from 'antd';

const userForm= forwardRef((props,ref)=> {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isDisabled, setisDisabled] = useState(false)
  // const onCreate = (values) => {
  //   console.log('Received values of form: ', values);
  //   setOpen(false);
  // };
  return (
    <Form form={form} ref={ref} {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}>
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '用户名必填' }]}
      >
        <Input placeholder="请填写用户名" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '密码必填' }]}
      >
        <Input placeholder="请填写密码" type="password" />
      </Form.Item>
      <Form.Item
        label="区域"
        name="region"
        rules={isDisabled?[]:[{ required: true, message: '区域必填' }]}
      >
        <Select
          allowClear
          disabled={isDisabled}
          placeholder="请选择区域范围"
        >
          {props.regionList.map((item) => {
            return (
              <Option key={item.id} value={item.title}></Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="角色"
        name="roleId"
        rules={[{ required: true, message: '角色必填' }]}
      >
        <Select
          allowClear
          onChange={(item) => {
            if (item==1) {
              ref.current.setFieldsValue({region:''})
              setisDisabled(true)
            }else{
              setisDisabled(false)
            }
          }}
          placeholder="请选择角色"
        >
          {props.roleList.map((item) => {
            return (
              <Option key={item.id} value={item.id}>
                {item.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
})
export default userForm
