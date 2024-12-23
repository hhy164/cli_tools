import ansiEscapes from 'ansi-escapes'
import readline from 'readline'

const list: string[] = require('./data.js');

// 初始化 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// 当前选中的索引
let curSelectIndex = 0;

function renderList() {
  console.clear(); // 清屏
  list.forEach((item: string, index: number) => {
    if (index === curSelectIndex) {
      // 如果是选中的项，使用 ANSI 转义码高亮显示（绿色背景、黑色前景）
      console.log(`\x1b[42m\x1b[30m ${item} \x1b[0m`);
    } else {
      console.log(`  ${item}`);
    }
  });
}

// 处理键盘输入
function handleInput(key: string) {
  if (key === 'w' || key === 'ArrowUp') {
    // 上移
    curSelectIndex = (curSelectIndex > 0) ? curSelectIndex - 1 : list.length - 1;
  } else if (key === 's' || key === 'ArrowDown') {
    // 下移
    curSelectIndex = (curSelectIndex < list.length - 1) ? curSelectIndex + 1 : 0;
  } else if (key === 'Enter') {
    // 确认选择
    console.log(`你选择了: ${list[curSelectIndex]}`);
    rl.close();
    return;
  }

  renderList(); // 重新渲染列表
}
// 显示列表并等待用户输入
function start() {
  renderList();
  rl.input.on('keypress', (_, key) => {
    handleInput(key.name);
  });
}

start();