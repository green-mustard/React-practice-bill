import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const New = () => {
  const navigate = useNavigate()
  const [dateVisible, setDateVisible] = useState(false)
  const [billType, setBillType] = useState('pay')
  // 控制收入与支出的状态
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => {
              setBillType('pay')
            }}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => {
              setBillType('income')
            }}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon icon="calendar" className="icon" />
              <span
                className="text"
                onClick={() => {
                  setDateVisible(!dateVisible)
                }}
              >
                {'今天'}
              </span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onClose={() => {
                  setDateVisible(!dateVisible)
                }}
              />
            </div>
            <div className="kaInput">
              <Input className="input" placeholder="0.00" type="number" />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div className={classNames('item', '')} key={item.type}>
                      <div className="icon">
                        <Icon icon={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save">保 存</Button>
      </div>
    </div>
  )
}

export default New
