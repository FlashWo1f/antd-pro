import { fixedZero } from '@/utils/utils'

let list = []
for (let i = 0; i < 50; i++) {
  list = list.concat({
    actiName: `星际开拓游戏测评${fixedZero(i)}`,
    key: `GTX10${fixedZero(i)}`,
    startTime: '2019.10.30',
    endTime: '2020.1.1',
    open: true,
    status: 1,
    actiSwitch: true,
    doneNum: 12 + i,
    updater: `瑞兹${i}`,
    phone: '18879349607',
    mailbox: 'fuyaozhishang80@163.com',
    activityName: '清华大学校招',
    reportNum: `2${i % 3}`,
    updateTime: '2019.12.2'
  })
}

export default {
  'GET /api/actimana': {
    pageSize: 10,
    pageNo: 1,
    list,
  }
}