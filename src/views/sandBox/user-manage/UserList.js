import React, { useEffect, useState, useRef } from 'react';
import { Table, Switch, Button, Modal } from 'antd';
import axios from 'axios';
import {
  UnorderedListOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import UserForm from '../../../components/user-manage/userForm';

export default function UserList() {
  const [dataSource, setdataSource] = useState([]);
  const [roleList, setroleList] = useState([]);
  const [regionList, setregionList] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isUpdateDisabled, setisUpdateDisabled] = useState(false);
  const [userDate, setuserDate] = useState({});
  const addForm = useRef(null);
  const updateForm = useRef(null);
  const { confirm } = Modal;
  useEffect(() => {
    axios.get('http://localhost:8000/regions').then((res) => {
      setregionList(res.data);
    });
  }, []);
  useEffect(() => {
    // 用户列表
    axios.get('http://localhost:8000/users?_expand=role').then((res) => {
      setdataSource(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then((res) => {
      setroleList(res.data);
    });
  }, []);
  const addformOK = () => {
    addForm.current
      .validateFields()
      .then((res) => {
        setOpen(false);
        axios
          .post('http://localhost:8000/users', {
            ...res,
            roleState: true,
            default: false
          })
          .then((list) => {
            addForm.current.resetFields();
            setdataSource([
              ...dataSource,
              {
                ...list.data,
                role: roleList.filter((item) => item.id == list.data.roleId)[0]
              }
            ]);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateformOK = () => {
    updateForm.current.validateFields().then((value) => {
      axios.patch(`http://localhost:8000/users/${userDate.id}`, { ...value }).then(() => {
        setdataSource(
          dataSource.map((item) => {
            if (item.id == userDate.id) {
              return {
                ...item,
                ...value,
                role: roleList.filter((row) => row.id == value.roleId)[0]
              };
            }
            return item;
          })
        );
      });
    });
    setUpdate(false);
  };
  const deleteMethod = (row) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.delete(`http://localhost:8000/users/${row.id}`).then(() => {
          setdataSource(dataSource.filter((item) => item.id != row.id));
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };
  const handleUpdate = (row) => {
    setUpdate(true);
    setTimeout(() => {
      if (row.roleId === 1) {
        setisUpdateDisabled(true);
      } else {
        setisUpdateDisabled(false);
      }
      setuserDate(row);
      updateForm.current.setFieldsValue(row);
    }, 0);
  };
  const handChange = (row) => {
    row.roleState = !row.roleState;
    setdataSource([...dataSource]);
    axios
      .patch(`http://localhost:8000/users/${row.id}`, {
        roleState: row.roleState
      })
      .then((res) => {
        console.log(res, '更新状态');
      });
  };
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item => {
          return { text: item.title, value: item.value }
        }),
        {
          text: '全球',
          value: '全球'
        }
      ],
      onFilter: (value, record) => {
        if (value === '全球') {
          return record.region === ''
        } else {
          return record.region === value
        }
      },
      render: (region) => {
        return <b>{region || '全球'}</b>;
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role.label;
      }
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      render: (item) => {
        return (
          <Switch
            checked={item.roleState}
            disabled={item.default}
            onClick={() => handChange(item)}
          ></Switch>
        );
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              danger
              disabled={item.default}
              icon={<DeleteOutlined />}
              onClick={() => deleteMethod(item)}
              shape="circle"
            />
            <Button
              disabled={item.default}
              icon={<UnorderedListOutlined />}
              onClick={() => handleUpdate(item)}
              shape="circle"
              style={{ marginLeft: '10px' }}
              type="primary"
            />
          </div>
        );
      }
    }
  ];
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        type="primary"
      >
        添加用户
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        rowKey={(item) => item.id}
      ></Table>
      <Modal
        onCancel={() => { setOpen(false) }}
        onOk={() => addformOK()}
        title="添加用户"
        visible={open}
      >
        <UserForm
          ref={addForm}
          regionList={regionList}
          roleList={roleList}
        ></UserForm>
      </Modal>
      <Modal
        cancelText="取消"
        okText="确定"
        onCancel={() => {
          setUpdate(false), setisUpdateDisabled(!isUpdateDisabled);
        }}
        onOk={() => UpdateformOK()}
        title="更新用户"
        visible={update}
      >
        <UserForm
          isUpdateDisabled={isUpdateDisabled}
          ref={updateForm}
          regionList={regionList}
          roleList={roleList}
        ></UserForm>
      </Modal>
    </div>
  );
}
