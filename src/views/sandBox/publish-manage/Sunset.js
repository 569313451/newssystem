import { Button, Input } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from "./Sunset.module.css"
export default function Sunset() {
  const [name, setName] = useState('wsw')
  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [type, setType] = useState('regions')
  const [typeList] = useState(['regions', 'categorys'])

  const InitPage = () => {
    let url = ''
    if (type === 'regions') {
      url = "http://localhost:8000/regions"
    } else {
      url = "http://localhost:8000/categorys"
    }
    axios.get(url).then(res => {
      console.log(res, 12);
      let listData = res.data
      let arr = []
      listData.map(item => {
        arr.push(item.value + 'ssr'.substring(0, 3).toUpperCase())
      })
      setList(arr)
    })
  }
  const setInput = (e) => {
    setText(e.target.value)
  }
  const addBtn = () => {
    setName(text);
    setList([...list, text])
    setText("")
  }
  const delList = (i) => {
    console.log(i, 17);
    let newList = [...list];
    newList.splice(i, 1)
    setList(newList)
  }
  useEffect(() => {
    InitPage()
    console.log(9);
  }, [type])
  return (
    <div>
      <ul>
        {
          typeList.map(item => <li key={item} onClick={() => { setType(item) }}>{item}</li>)
        }
      </ul>
      <Input onChange={setInput} value={text}></Input>
      <Button onClick={addBtn}>add</Button>
      <div className={style.title}>{name}</div>
      <ul>
        {list.map((item, index) => {
          return <li key={item}>{item}
            <Button onClick={() => delList(index)}>del</Button>
          </li>
        })}
      </ul>
      {!list.length && <div>暂无数据</div>}
    </div>
  )
}
