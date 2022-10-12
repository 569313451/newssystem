import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, message } from 'antd'
import { DeleteOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
export default function NewsDraft() {
  const [dataSource, setdataSource] = useState([])
  const { confirm } = Modal;
  useEffect(() => {
    // 获取草稿箱数据
    axios.get('http://localhost:8000/news?author=admin&auditState=0').then(res => {
      console.log(res.data);
      setdataSource(res.data)
    })
  }, [])
  const delMethod = (item) => {
    confirm({
      title: `你确定要删除《${item.title}》?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.delete('http://localhost:8000/news/' + item.id).then(() => {
          message.success('删除成功')
          setdataSource(dataSource.filter(data => data.id !== item.id))
        })
      },
      onCancel() {
        message.success('已取消')
      }
    });
  };
  const editMethod = (item) => {
    confirm({
      title: `你确定要提审文章《${item.title}》?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.patch('http://localhost:8000/news/' + item.id, { auditState: 1 }).then(() => {
          message.success('提审成功')
          setdataSource(dataSource.filter(data => data.id !== item.id))
        })
      },
      onCancel() {
        message.success('已取消')
      }
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title'
    }, {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            danger icon={<DeleteOutlined />} onClick={() => { delMethod(item) }} shape="circle"
          />
          <Button
            icon={<UploadOutlined />} onClick={() => { editMethod(item) }}
            shape="circle" style={{ marginLeft: '10px' }}
            type="primary"
          />
        </div>
      }
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={(item) => item.id}></Table>
    </div>
  )
}
