import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'

const New = () => {
  const navigate = useNavigate()
  // 控制日期选择器的显示与隐藏
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const dateConfirm = date => {
    setDate(dayjs(date).format('YYYY-MM-DD'))
  }
  // 控制收入与支出的状态
  const [billType, setBillType] = useState('pay')
  // 收集金额
  const [money, setMoney] = useState(undefined)
  const moneyChange = value => {
    setMoney(value)
  }
  // 收集账单类型
  const [useFor, setUseFor] = useState('')

  const dispatch = useDispatch()
  // 保存账单的回调
  const saveBill = () => {
    // 收集表单数据
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: date,
      useFor
    }
    for (let key in data) {
      if (!data[key]) {
        alert('请填写完整表单')
        return
      }
    }
    dispatch(addBillList(data))
    navigate(-1)
  }
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
                {date}
              </span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onClose={() => {
                  setDateVisible(!dateVisible)
                }}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                value={money}
                type="number"
                onChange={moneyChange}
                onFocus={() => {
                  setMoney('')
                }}
              />
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
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type && 'mask'
                      )}
                      key={item.type}
                      onClick={() => {
                        setUseFor(item.type)
                      }}
                    >
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
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New
