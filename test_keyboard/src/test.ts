import readline from 'node:readline';
import { list } from './data.js';
import chalk from 'chalk';

// 当前选中的索引
let curSelectIndex = 0;

// 设置 stdin 为 raw 模式，允许捕获键盘输入
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

// 渲染列表
function renderList() {
  // 清空控制台
  console.clear();

  // 遍历列表并渲染
  list.forEach((item, index) => {
    if (index === curSelectIndex) {
      console.log(chalk.bgBlue(item)); // 选中项用蓝色背景
    } else {
      console.log(item); // 普通项
    }
  });
}

// 启动程序
function start() {
  renderList();

  // 监听键盘输入
  process.stdin.on('data', handleInput);
}

// 处理键盘输入
function handleInput(key: any) {
  if (key === '\u0003') {
    // 如果用户按下 Ctrl+C，退出程序
    process.exit();
  } else if (key === '\u001b[A') {
    // 上箭头：移动到上一项
    curSelectIndex = (curSelectIndex - 1 + list.length) % list.length;
    renderList();
  } else if (key === '\u001b[B') {
    // 下箭头：移动到下一项
    curSelectIndex = (curSelectIndex + 1) % list.length;
    renderList();
  } else if (key === '\r') {
    // 回车键：确认选择
    console.log(chalk.green(`You selected: ${list[curSelectIndex]}`));
    // 如果你不想退出，删除下面的 `process.exit()` 行
    process.exit();
  }
}

// 启动程序
start();
