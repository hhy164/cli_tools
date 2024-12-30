import readline from 'node:readline'
import process from 'node:process'
import ansiEscape from 'ansi-escapes'
import { list } from './data.js'
import chalk from 'chalk';

let curSelectIndex = 0; // 当前选中的行
let scrollTop = 0; // 滚动的行
let columns = process.stdout.columns; // 终端的列数
let rows = process.stdout.rows; // 终端的行数

function start() {
  // 监听输入
  readline.emitKeypressEvents(process.stdin)
  // 设置原始模式
  process.stdin.setRawMode(true)
  // 事件监听
  process.stdin.on('keypress', handlePress)
  // 初始化屏幕
  clearScreen()
  renderList()
}

function handlePress(_: any, key: any) {
  // 按住了control+c
  if (key.sequence === '\x03') {
    // 显示光标
    process.stdout.write(ansiEscape.cursorShow)
    clearScreen()
    // 退出进程
    process.exit();
  }
  if (key.name === 'up' && curSelectIndex > 0) {
    curSelectIndex--
    if (curSelectIndex < scrollTop) {
      // 说明已经减到了看不到的位置，所以需要滚动
      scrollTop = curSelectIndex
    }
  }

  if (key.name === 'down' && curSelectIndex < list.length - 1) {
    // 按键盘下
    curSelectIndex++
    if (curSelectIndex >= scrollTop + rows - 1) {
      scrollTop = curSelectIndex - rows + 2
    }
  }
  renderList()
}

// 清除整行
function clearLine(row: number) {
  process.stdout.write(ansiEscape.cursorTo(0, row))
  process.stdout.write(ansiEscape.eraseLine)
}

// 清除整屏
function clearScreen() {
  // 清屏
  process.stdout.write(ansiEscape.clearScreen);
  // 移动光标到(0,0)
  process.stdout.write(ansiEscape.cursorTo(0, 0))
}

function renderList() {
  // 隐藏光标
  process.stdout.write(ansiEscape.cursorHide)
  // 计算可视区域
  const visibleList = list.slice(scrollTop, scrollTop + rows - 1)
  visibleList.forEach((item: string, index: number) => {
    // 清除行
    clearLine(index)
    const content = item.padEnd(columns)
    process.stdout.write(ansiEscape.cursorTo(0, index))
    if (scrollTop + index === curSelectIndex) {
      // 当前选中的行，需要高亮
      process.stdout.write(chalk.bgBlue(content))
    } else {
      process.stdout.write(content)
    }
  })
}

start()