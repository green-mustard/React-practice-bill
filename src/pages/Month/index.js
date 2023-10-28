import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './DayBill'

const Month = () => {
  // 控制时间选择器的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)

  // 控制时间的显示
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM')
  })

  // 按月做数据的分组
  // 从redux中拿到数据
  const billList = useSelector(state => state.bill.billList)
  // 类似Vue中的计算属性
  const monthGroup = useMemo(() => {
    // return计算之后的值
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
  }, [billList])

  const [currentMonthList, setCurrentMonthList] = useState([])
  // 日期选择器确认按钮的回调
  const onConfirm = date => {
    const formatDate = dayjs(date).format('YYYY-MM')
    //在JavaScript中，可以使用方括号（[]）通过变量或表达式的值来访问对象的属性。
    setCurrentMonthList(monthGroup[formatDate])
    setCurrentDate(formatDate)
  }
  const monthResult = useMemo(() => {
    // 计算支出、收入和结余的数据
    // 避免没有数据报错
    if (!currentMonthList || currentMonthList.length === 0) {
      return {
        pay: 0,
        income: 0,
        total: 0
      }
    }
    // 支出pay
    const pay = currentMonthList
      .filter(item => item.type === 'pay')
      .reduce((pre, cur) => pre + cur.money, 0)
    // 收入income
    const income = currentMonthList
      .filter(item => item.type === 'income')
      .reduce((pre, cur) => pre + cur.money, 0)

    return {
      pay,
      income,
      // 结余
      total: pay + income
    }
  }, [currentMonthList])

  // 初始化的时候把当前月的统计数据显示出来
  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM')
    // 边界值控制
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate])
    }
  }, [monthGroup])

  // 当前月数据按照日期来分组
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, item =>
      dayjs(item.date).format('YYYY-MM-DD')
    )
    const dayKeys = Object.keys(groupData)
    return {
      groupData,
      dayKeys
    }
  }, [currentMonthList])
  // console.log(dayGroup)
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div
            className="date"
            onClick={() => {
              setDateVisible(true)
            }}
          >
            <span className="text">{currentDate}月账单</span>
            {/* <span className="arrow expand"></span> */}
            <span
              className={classnames('arrow', dateVisible && 'expand')}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            closeOnMaskClick
            onClose={() => {
              setDateVisible(false)
            }}
            onConfirm={onConfirm}
          />
        </div>
        {/* 使用 orderBy 方法对 dayGroup.dayKeys 数组进行排序，第一个参数是要排序的数组，第二个参数是排序的依据，这里使用 key => key 表示按照数组元素本身进行排序，第三个参数是排序方式，这里使用 ['desc'] 表示降序排列。在这里，key => key 是一个箭头函数，它的作用是返回数组元素本身，即按照日期进行排序。具体来说，dayGroup.dayKeys 数组中的每个元素都是一个字符串，表示一个日期，例如 "2022-11-01"，所以按照日期排序时，直接使用元素本身作为排序依据即可。 */}
        {_.orderBy(dayGroup.dayKeys, key => key, ['desc']).map(dayKey => (
          <DailyBill
            key={dayKey}
            date={dayKey}
            billList={dayGroup.groupData[dayKey]}
          />
        ))}
      </div>
    </div>
  )
}

export default Month
