import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, message } from 'antd'
import { DeleteOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
export default function AuditList() {
  const [dataSource, setdataSource] = useState([])
  const { confirm } = Modal;
  useEffect(() => {
    // 获取草稿箱数据
    axios.get('http://localhost:8000/news?author=admin&auditState=1').then(res => {
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
  const filterFn = (num) => {
    let obj
    const arr = [
      { key: '草稿', value: 0, color: '#333' },
      { key: '待审核', value: 1, color: '#222' },
      { key: '待发布', value: 2, color: '#444' },
      { key: '已发布', value: 3, color: '#555' }
    ]
    arr.filter((row) => {
      if (row.value == num) {
        obj = row
      }
    });
    return <span style={{ color: obj.color }}> {obj.key}</span >
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '状态',
      dataIndex: 'auditState',
      render: (item) => {
        return <div>{filterFn(item)}</div>
      }
    },
    {
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
