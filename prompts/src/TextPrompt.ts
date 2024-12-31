import ansiEscapes from 'ansi-escapes';
import { Key, Prompt } from './Prompt.js';
import chalk from 'chalk';

export interface TextPromptOptions {
  type: 'text',
  name: string,
  message: string
}
// 判断是否是非打印字符
function isNonPrintableChar(char: string) {
  return /^[\x00-\x1F\x7F]$/.test(char);
}

export class TextPrompt extends Prompt {
  cursor = 0;
  constructor(private options: TextPromptOptions) {
    super();
  }
  onKeyInput(str: string, key: Key): void {
    // backspace是删除键-delete
    if (key.name === 'backspace') {
      this.cursor--;
      this.value = this.value.slice(0, this.cursor)
    }
    if (!isNonPrintableChar(str)) {
      this.value += str;
      this.cursor++
    }
    this.render()
  }
  render() {
    // 清除本行
    process.stdout.write(ansiEscapes.eraseLine)
    // 移动光标到当前行的开头
    process.stdout.write(ansiEscapes.cursorTo(0))
    process.stdout.write(`${chalk.bold(this.options.message)}${chalk.gray('›')} ${chalk.blue(this.value)}`)
    /**
     * 保存当前光标位置，以便后续可以通过恢复光标位置的命令将光标移动
     * 回到保存的位置，这是通过ANSI转义序列实现的功能，常用于终端光标控制
     * ansiEscapes.cursorSavePosition和ansiEscapes.cursorRestorePosition配合使用
     * 可以通过ansiEscapes.cursorRestorePosition恢复到保存的位置
     */
    process.stdout.write(ansiEscapes.cursorSavePosition);
    // ansiEscapes.cursorDown(1)->光标向下移动1行
    process.stdout.write(ansiEscapes.cursorDown(1) + ansiEscapes.cursorTo(0))
    if (this.value === '') {
      process.stdout.write(chalk.red('请输入名字'))
    } else {
      // 清空行
      process.stdout.write(ansiEscapes.eraseLine)
    }
    process.stdout.write(ansiEscapes.cursorRestorePosition)
  }
}