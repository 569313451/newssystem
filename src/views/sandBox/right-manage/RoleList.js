import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Tree, message } from 'antd'
import axios from 'axios'
import { UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal;
export default function RoleList() {
  const [dataSource, setdataSource] = useState([])
  const [treeData, setTreeData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState([])
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then(res => {
      setdataSource(res.data)
    })
    axios.get('http://localhost:8000/menuLists?_embed=children').then(res => {
      setTreeData(res.data)
    })
  }, [])
  const delectMethod = (item) => {
    console.log(item);
    // 当前页面同步 后端删除数据
    setdataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:8000/roles/${item.id}`)
  }
  const confirmMethod = item => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('ok');
        delectMethod(item)
      },
      onCancel() {
        console.log('Cancel');
      }
    })
    console.log(item, 15);
  }
  const editMethod = item => {
    setCheckedKeys(item.rights)
    setCurrentId(item.id)
    setIsModalOpen(true);
  }
  const handleOk = () => {
    // 更新页面
    let arr = dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: checkedKeys
        }
      }
      return item
    })
    // 修改后端数据
    axios.patch(`http://localhost:8000/roles/${currentId}`, { rights: checkedKeys }).then(res => {
      if (res.status == 200) {
        message.success('修改成功')
      }
    })
    setdataSource(arr)
    setIsModalOpen(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: id => {
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'label'
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            danger icon={<DeleteOutlined />} onClick={() => { confirmMethod(item) }} shape="circle"
          />
          <Button
            icon={<UnorderedListOutlined />} onClick={() => { editMethod(item) }}
            shape="circle" style={{ marginLeft: '10px' }}
            type="primary"
          />
        </div>
      }
    }
  ];
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys.checked)
  };
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={item => item.id}></Table>
      <Modal onCancel={handleCancel} onOk={handleOk} title="权限分配" visible={isModalOpen}>
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
  )
}
