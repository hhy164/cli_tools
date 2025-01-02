const blessed = require('blessed')

const screen = blessed.screen({
  fullUnicode: true
})
// 选择文件目录
const fm = blessed.filemanager({
  parent: screen,
  border: 'line',
  height: 'half',
  width: 'half',
  top: 'center',
  left: 'center',
  label: ' {blue-fg}%path{/blue-fg} ',
  /** 
   * 获取当前工作目录current working directory
   * 和__dirname不同，process.cwd()是动态的，可能随着工作目录的改变而改变
  */
  cwd: process.cwd(),
  keys: true,
  style: {
    selected: {
      bg: 'blue'
    }
  },
  scrollbar: {
    bg: 'white'
  }
})
// 监听选中file
fm.on('file', (file) => {
  screen.destroy();
  console.log(file)
})

screen.key('C-c', function () {
  screen.destroy()
})

fm.refresh();

screen.render()