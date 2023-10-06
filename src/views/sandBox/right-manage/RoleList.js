import React, { useEffect, useState } from 'react';
import { Form, Input, Table, Button, Modal, Tree, message } from 'antd';
import axios from 'axios';
import {
  UnorderedListOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
const { confirm } = Modal;
export default function RoleList() {
  const [form] = Form.useForm();
  const [values, setValues] = useState({
    label: '角色名称'
  });
  const [dataSource, setdataSource] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const handleInit = () => {
    axios.get('http://localhost:8000/roles').then((res) => {
      setdataSource(res.data);
    });
    axios.get('http://localhost:8000/menuLists?_embed=children').then((res) => {
      setTreeData(res.data);
    });
  };
  useEffect(() => {
    handleInit()
  }, []);
  const delectMethod = (item) => {
    console.log(item);
    // 当前页面同步 后端删除数据
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:8000/roles/${item.id}`);
  };
  const confirmMethod = (item) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('ok');
        delectMethod(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    console.log(item, 15);
  };
  const handleAdd = () => {
    setCurrentId(0);
    setCheckedKeys([]);
    setValues({
      label: ''
    })
    setIsModalOpen(true);
  };
  const editMethod = (item) => {
    setCheckedKeys(item.rights);
    setCurrentId(item.id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(form.getFieldsValue(), checkedKeys, 55);
    if (currentId === 0) {
      // 新增
      axios.post(`http://localhost:8000/roles`, {
        ...form.getFieldsValue(),
        rights: checkedKeys,
      }).then(() => {
        handleInit()
        message.success('新增成功');
      })
    } else {
      // 更新
      axios
        .patch(`http://localhost:8000/roles/${currentId}`, {
          rights: checkedKeys,
        })
        .then((res) => {
          if (res.status == 200) {
            handleInit()
            message.success('修改成功');
          }
        });
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: '角色名称',
      dataIndex: 'label',
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              icon={<UnorderedListOutlined />}
              onClick={() => {
                editMethod(item);
              }}
              shape="circle"
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                confirmMethod(item);
              }}
              shape="circle"
              style={{ marginLeft: '10px' }}
            />
          </div>
        );
      },
    },
  ];
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys.checked);
  };
  return (
    <div>
      <Button onClick={() => handleAdd()} type="primary">
        添加
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        title="角色"
        visible={isModalOpen}
      >
        <Form
          form={form}
          onFinish={handleOk}
          {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
        >
          <Form.Item
            label="角色名称"
            name="label"
            rules={[{ required: true, message: '角色名称' }]}
          >
            <Input
              onChange={(e) => setValues({ ...values, label: e.target.value })}
              placeholder="请填写角色名称"
              value={values.label}
            />
          </Form.Item>
        </Form>
        <Tree
          checkStrictly
          checkable
          checkedKeys={checkedKeys}
          fieldNames={{ title: 'label' }}
          onCheck={onCheck}
          onSelect={onSelect}
          treeData={treeData}
        />
      </Modal>
    </div>
  );
}
