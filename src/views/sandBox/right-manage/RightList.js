/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
const { confirm } = Modal
export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  const FilterMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length > 0) {
        item.children = FilterMenu(item.children)
      } else {
        delete item.children
      }
      return item
    })
  }
  const getMenu = () => {
    axios.get('http://localhost:8000/menuLists?_embed=children').then(res => {
      setdataSource(FilterMenu(res.data))
    })
  }
  useEffect(() => {
    getMenu()
  }, [])

  const delectMethod = async (item) => {
    console.log(item, 29);
    await axios.delete(`http://localhost:8000/menuLists/${item.id}`)
    await getMenu()
    // 当前页面同步 后端删除数据
    // if (item.grade === 1) {
    //   setdataSource(dataSource.filter(data => data.id !== item.id))
    //   axios.delete(`http://localhost:8000/menuLists/${item.id}`)
    // } else {
    //   let arr = dataSource.filter(data => data.id === item.menuListId)
    //   arr[0].children = arr[0].children.filter(data => data.id !== item.id)
    //   setdataSource([...dataSource])
    //   axios.delete(`http://localhost:8000/children/${item.id}`)
    // }
  }

  const confirmMethod = (item) => {
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
  }
  const changeSwitch = (item) => {
    item.pagepermisson = item.pagepermisson == 1 ? 0 : 1
    setdataSource([...dataSource])
    let url = item.grade === 1
      ? `http://localhost:8000/menuLists/${item.id}`
      : `http://localhost:8000/children/${item.id}`
    axios.patch(url, { pagepermisson: item.pagepermisson })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'label'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      // eslint-disable-next-line react/no-multi-comp
      render: (item) => {
        return <div>
          <Popover
            content={<div style={{ textAlign: 'center' }}>
              <Switch checked={item.pagepermisson} onChange={() => changeSwitch(item)}></Switch>
            </div>}
            title="页面配置项"
            trigger={item.pagepermisson == undefined ? '' : 'click'}
          >
            <Button disabled={item.pagepermisson == undefined} icon={<EditOutlined />} shape="circle" type="primary" />
          </Popover>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => { confirmMethod(item) }}
            shape="circle"
            style={{ marginLeft: '10px' }}
            type="primary"
          />
        </div>
      }
    }
  ];
  return (
    <div>
      {/* pagination={{ pageSize:'4'}} */}
      <Table columns={columns} dataSource={dataSource} ></Table>
    </div>
  )
}
