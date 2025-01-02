const blessed = require('blessed')
const contrib = require('blessed-contrib')

const screen = blessed.screen({
  fullUnicode: true
})

const grid = new contrib.grid({ rows: 12, cols: 12, screen })
// 在(0,0)位置渲染宽高占6份的gauge组件
grid.set(0, 0, 6, 6, contrib.gauge, {
  label: '下载进度',
  width: 'half',
  stroke: 'green',
  fill: 'white',
  percent: 0.3
})
// 在(0,6)位置，渲染宽高占6份的donut组件
grid.set(0, 6, 6, 6, contrib.donut, {
  label: '进度',
  radius: 10,
  arcWidth: 2,
  remainColor: 'black',
  data: [
    { percent: 0.3, label: 'aaa 进度', color: 'green' },
    { percent: 0.5, label: 'bbb 进度', color: 'red' }
  ]
})

screen.key('C-c', function () {
  screen.destroy()
})

screen.render()