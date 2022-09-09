/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import zhCN from 'antd/es/locale/zh_CN';
import IndexRouter from './router/IndexRouter'
import { ConfigProvider } from 'antd'
function App() {
  // const localeList = []
  return <ConfigProvider locale={zhCN}>
    <IndexRouter></IndexRouter>
  </ConfigProvider>

}
export default App