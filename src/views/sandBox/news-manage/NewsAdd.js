/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './NewAdd.module.css'
import { PageHeader, Steps, Button, Input, Form, Select, message } from 'antd'
import axios from 'axios';
import NewsEditor from '../../../components/news-manage/NewsEditor'
const { Step } = Steps;
const { Option } = Select;
export default function NewsAdd() {
  const [current, setcurrent] = useState(0)
  const [categoryList, setcategoryList] = useState([])
  const [formInfo, setformInfo] = useState({})
  const [content, setcontent] = useState('')

  const navigate = useNavigate();
  const NewsForm = useRef(null)
  const handNext = () => {
    if (current === 0) {
      NewsForm.current.validateFields().then(res => {
        setformInfo(res)
        setcurrent(current + 1)
      }).catch(err => {
        console.log(err);
      })
    } else {
      if (content === '' || content.trim() === '<p></p>') {
        message.error('新闻内容不能为空')
      } else {
        setcurrent(current + 1)
      }
    }
  }
  const handPrevious = () => {
    setcurrent(current - 1)
  }
  const getCategory = () => {
    axios.get('http://localhost:8000/categorys').then(res => {
      setcategoryList(res.data)
    })
  }
  const handSave = (auditState) => {
    axios.post('http://localhost:8000/news', {
      ...formInfo,
      'content': content,
      'region': '',
      'author': 'admin',
      'roleId': 1,
      'auditState': auditState,
      'publishState': 1,
      'createTime': Date.now(),
      'star': 0,
      'view': 0
    }).then(res => {
      console.log(res);
      navigate('/news-manage/draft')
    })
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <div>
      <PageHeader
        className="site-page-header"
        subTitle="This is a subtitle"
        title="撰写新闻"
      />
      <Steps current={current}>
        <Step description="新闻标题,新闻分类" title="基本信息" />
        <Step description="新闻主体内容" title="新闻内容" />
        <Step description="保存草稿箱或提交审核" title="新闻提交" />
      </Steps>
      <div style={{ marginTop: '50px' }}>
        <div className={current === 0 ? '' : style.active}>
          <Form
            autoComplete="off"
            initialValues={{ remember: true }}
            labelCol={{ span: 2 }}
            ref={NewsForm}
            wrapperCol={{ span: 22 }}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '请填写标题!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: '请填写标题!'
                }
              ]}
            >
              <Select>
                {
                  categoryList.map((item) => {
                    return <Option key={item.id} value={item.id}>{item.title}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? '' : style.active}>
          <NewsEditor getContent={(value) => {
            // console.log(value,91);
            setcontent(value)
          }}
          ></NewsEditor>
        </div>
        <div className={current === 2 ? '' : style.active}>
          333
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        {
          current === 2 && <span>
            <Button onClick={() => handSave(0)} type="primary">保存草稿箱</Button>
            <Button onClick={() => handSave(1)} type="danger">提交审核</Button>
          </span>
        }
        {
          current < 2 && <Button onClick={handNext} type="primary">下一步</Button>
        }
        {
          current > 0 && <Button onClick={handPrevious}>上一步</Button>
        }
      </div>
    </div>
  )
}