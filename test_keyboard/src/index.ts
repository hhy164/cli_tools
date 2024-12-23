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
  list.forEach((item, index) => {
    if (index === curSelectIndex) {
      process.stdout.write(chalk.bgBlue(item) + '\n')
    } else {
      process.stdout.write(item + '\n')
    }
  })
}

start();
