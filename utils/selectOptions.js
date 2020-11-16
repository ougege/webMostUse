/* 
  用于筛选框的条件
*/

// 推送范围
const pushRangeStatus = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '新注册用户'
  },
  {
    value: 2,
    label: '所有留存用户'
  },
  {
    value: 3,
    label: '留存30天用户'
  },
  {
    value: 4,
    label: '留存6个月用户'
  },
  {
    value: 5,
    label: '特定用户'
  },
]

let selectOptions = {
  pushRangeStatus: pushRangeStatus
}

export default selectOptions