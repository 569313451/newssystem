import axios from 'axios'
import { Table, Button, Modal, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
const { confirm } = Modal
export default function NewsCategory() {
  const [categoryList, setcategoryList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [modalTitle, setmodalTitle] = useState('')
  const [categoryObj, setCategoryObj] = useState({})
  const getCategory = () => {
    axios.get('http://localhost:8000/categorys').then(res => {
      setcategoryList(res.data)
    })
  }
  const handleChange = () => {
    console.log('add');
    setmodalTitle('添加分类')
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setCategoryName('')
    setIsModalOpen(false);
  };
  // ok
  const handleOk = () => {
    if (modalTitle == '添加分类') {
      axios.post('http://localhost:8000/categorys', { title: categoryName, value: categoryName }).then(res => {
        setIsModalOpen(false);
        setCategoryName('')
        setcategoryList([...categoryList, { ...res.data }])
      })
    } else if (modalTitle == '编辑分类') {
      axios.patch('http://localhost:8000/categorys/' + categoryObj.id, { title: categoryName }).then(res => {
        setIsModalOpen(false);
        setCategoryName('')
        setcategoryList([...categoryList.filter(item => item.id != categoryObj.id), { ...res.data }])
      })
    }

  };
  const deleteMethod = (row) => {
    confirm({
      title: '你确定要删除?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.delete('http://localhost:8000/categorys/' + row.id).then(() => {
          message.success('删除成功')
          setcategoryList([...categoryList.filter(item => item.id != row.id)])
        })
      },
      onCancel() {
        console.log('Cancel');
      }
    })

  }
  const handleUpdate = (row) => {
    console.log(row.title, 34);
    setCategoryName(row.title)
    setCategoryObj(row)
    setmodalTitle('编辑分类')
    setIsModalOpen(true)
  }

  useEffect(() => {
    getCategory()
  }, [])

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '标题', dataIndex: 'title' },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id, item) => {
        return <div>
          <Button
            danger
            disabled={item.default}
            icon={<DeleteOutlined />}
            onClick={() => deleteMethod(item)}
            shape="circle"
          />
          <Button
            disabled={item.default}
            icon={<EditOutlined />}
            onClick={() => handleUpdate(item)}
            shape="circle"
            style={{ marginLeft: '10px' }}
            type="primary"
          />
        </div>
      }
    }
  ]
  return (
    <div>
      <Button onClick={() => handleChange()} type="primary">添加</Button>
      <Table columns={columns} dataSource={categoryList} rowKey={(item) => item.id}></Table>
      <Modal onCancel={handleCancel} onOk={handleOk} title={modalTitle} visible={isModalOpen}>
        <Input
          onChange={(e) => { setCategoryName(e.target.value) }}
          placeholder="输入新闻分类"
          value={categoryName}
        />
      </Modal>
    </div>
  )
}
