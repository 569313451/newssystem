import React from 'react'
import { Button, Table } from 'antd'
export default function Audit() {
  const editMethod = (item) => {
    console.log(item, 5);
  }
  const dataSource = []
  const columns = [
    {
      title: 'ID',
      dataIndex: "id"
    },
    {
      title: '标题',
      dataIndex: "title"
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button onClick={() => { editMethod(item) }}>通过</Button>
          </div>
        )
      }
    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} rowKey={item => item.id}></Table>
    </div>
  )
}
