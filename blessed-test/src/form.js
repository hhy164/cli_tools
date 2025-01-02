const blessed = require('blessed')

const screen = blessed.screen({
  fullUnicode: true
})

const prompt = blessed.prompt({
  parent: screen,
  border: 'line',
  height: 'shrink',
  width: 'half',
  top: 'center',
  left: 'center',
  label: ' {blue-fg}登录{/blue-fg} ',
  tags: true,
})

const msg = blessed.message({
  parent: screen,
  border: 'line',
  width: 'half',
  // 按照内容自定义填充高度
  height: 'shrink',
  top: 'center',
  left: 'center',
  label: ' {blue-fg}提示{/blue-fg} ',
  // 启用文本中的标签解析，blue-fg表示蓝色前景色，/blue-fg表示关闭蓝色前景色
  tags: true,
  // 设置消息框初始状态是否隐藏
  hidden: true,
})
// 第二个参数表示默认值
prompt.input('你的用户名？', '', function (err, username) {
  prompt.input('你的密码?', '', function (err, password) {
    if (username === 'hhy' && password === '123') {
      // 显示消息，1秒后自动隐藏
      msg.display('登录成功！', 1)
    } else {
      msg.display('用户名或密码错误！', 1)
    }
    setTimeout(function () {
      screen.destroy()
      console.log(username, password)
    }, 1000)
  })
})

screen.key('C-c', function () {
  screen.destroy()
})

screen.render()