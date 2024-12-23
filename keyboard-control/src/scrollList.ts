import { BaseUi } from "./base-ui.js";
import chalk from 'chalk';
import ansiEscapes from 'ansi-escapes'

export class ScrollList extends BaseUi {
  // 当前的选中行
  curSelectIndex = 0;
  // 距离顶部滚动的距离
  scrollTop = 0;
  constructor(private list: Array<string> = []) {
    super();
    this.render()
  }
  onKeyInput(name: string) {
    // up：方向键上 down:方向键下
    if (name !== 'up' && name !== 'down') {
      return;
    }
    // 执行up() 或者 down()
    this.keys[name]();
    this.render();
  }

  keys = {
    up: () => this.cursorUp(),
    down: () => this.cursorDown()
  }

  cursorUp() {
    // 按键上，光标上移
    this.moveCursor(-1)
  }

  cursorDown() {
    // 按键下，光标下移
    this.moveCursor(1)
  }

  moveCursor(index: number) {
    this.curSelectIndex += index;
    if (this.curSelectIndex < 0) {
      this.curSelectIndex = 0;
    }
    if (this.curSelectIndex >= this.list.length) {
      this.curSelectIndex = this.list.length - 1;
    }
    this.fitScroll();
  }

  fitScroll() {
    const shouldScrollUp = this.curSelectIndex < this.scrollTop;
    const shouldScrollDown = this.curSelectIndex > this.scrollTop + this.terminalSize.rows - 2;
    if (shouldScrollUp) {
      this.scrollTop--
    }
    if (shouldScrollDown) {
      this.scrollTop++
    }
    this.clear()
  }
  clear() {
    for (let row = 0; row < this.terminalSize.rows; row++) {
      this.clearLine(row)
    }
  }
  bgRow(text: string) {
    return chalk.bgBlue(text + ' '.repeat(this.terminalSize.columns - text.length))
  }
  render() {
    const visibleList = this.list.slice(this.scrollTop, this.scrollTop + this.terminalSize.rows);
    visibleList.forEach((item: string, index: number) => {
      const row = index;
      this.clearLine(row)
      let content = item;
      // 选中行加上背景色
      if (this.curSelectIndex === this.scrollTop + index) {
        content = this.bgRow(content)
      }
      this.printAt(content, {
        x: 0,
        y: row
      })
    })
  }
}