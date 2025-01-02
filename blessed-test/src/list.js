const blessed = require('blessed')
// 创建一个终端屏幕对象
const screen = blessed.screen({
  // 启用对全Unicode字符支持,支持中文字符
  fullUnicode: true
})

const data = [
  "红楼梦",
  "西游记",
  "水浒传",
  "三国演义",
  "儒林外史",
  "金瓶梅",
  "聊斋志异",
  "白鹿原",
  "平凡的世界",
  "围城",
  "活着",
  "百年孤独",
  "围城",
  "红高粱家族",
  "梦里花落知多少",
  "倾城之恋",
  "悲惨世界",
  "哈利波特",
  "霍乱时期的爱情",
  "白夜行",
  "解忧杂货店",
  "挪威的森林",
  "追风筝的人",
  "小王子",
  "飘",
  "麦田里的守望者",
  "时间简史",
  "人类简史",
  "活着为了讲述",
  "白夜行",
  "百鬼夜行"
]
// blessed.list创建列表组件
const list = blessed.list({
  width: '50%',
  height: '50%',
  border: 'line', // 边框颜色和背景色一致
  label: '书籍列表',
  align: 'left',
  right: 0,
  top: 0,
  keys: true, // 启用键盘支持
  mouse: true, // 启用鼠标控制
  style: {
    fg: 'white', // 前景色
    bg: 'default',
    selected: {
      bg: 'blue' // 选中项的背景色
    }
  },
  items: data
})


screen.append(list)

list.select(0)

list.on('select', function (item) {
  // 退出程序
  screen.destroy()
  console.log(item.getText())
})
// control+c退出
screen.key('C-c', function () {
  screen.destroy()
})

list.focus()

screen.render()