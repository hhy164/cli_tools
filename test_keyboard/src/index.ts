import ansiEscapes from 'ansi-escapes'
import readline from 'node:readline'
import { list } from './data.js'
import chalk from 'chalk'


// 选中的index
let curSelectIndex = 0;

function start() {
  renderList()
}

function renderList() {
  const {columns, rows} = getTerminalSize();
  list.forEach((item, index) => {
    if (index === curSelectIndex) {
      process.stdout.write(chalk.bgBlue(item) + '\n')
    } else {
      process.stdout.write(item + '\n')
    }
  })
}

function getTerminalSize(){
  // 获取到终端的行数和列数
  return {
    columns : process.stdout.columns,
    rows: process.stdout.rows,
  }
}

start();
