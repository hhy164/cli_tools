const blessed = require('blessed')
const contrib = require('blessed-contrib')

const screen = blessed.screen({
  fullUnicode: true
})

const bar = contrib.bar({
  label: '气温变化',
  barWidth: 8,
  barspacing: 20,
  maxHeight: 20
})

screen.append(bar)

bar.setData({
  titles: ['10.1', '10.2', '10.3', '10.4'],
  data: [6, 13, 8, 10]
})

screen.key('C-c', function () {
  screen.destroy()
})

screen.render()