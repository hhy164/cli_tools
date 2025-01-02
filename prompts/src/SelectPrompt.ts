import ansiEscapes from 'ansi-escapes';
import { Key, Prompt } from './Prompt.js';
import chalk from 'chalk';

export interface SelectPromptOptions {
  type: 'select';
  name: string;
  message: string;
  choices: Array<string>
}
export class SelectPrompt extends Prompt {
  index = 0;
  constructor(private options: SelectPromptOptions) {
    super()
    this.value = options.choices[0]
  }
  onKeyInput(str: string, key: Key): void {
    if (key.name !== 'up' && key.name !== 'down') {
      return
    }
    if (key.name === 'down') {
      this.index += 1;
      if (this.index > this.options.choices.length - 1) {
        this.index = 0;
      }
    }
    if (key.name === 'up') {
      this.index -= 1;
      if (this.index < 0) {
        this.index = this.options.choices.length - 1
      }
    }
    this.value = this.options.choices[this.index];
    this.render()
  }

  render() {
    process.stdout.write(ansiEscapes.eraseLine);
    process.stdout.write(ansiEscapes.cursorTo(0))
    process.stdout.write(`${chalk.bold(this.options.message)}${chalk.gray('›')} ${chalk.blue(this.value)}`)
    process.stdout.write(ansiEscapes.cursorSavePosition);
    for (const item of this.options.choices) {
      // 为了保证有光标可以进行下移，先保证光标不是在最后一行
      process.stdout.write('\n');
      process.stdout.write(ansiEscapes.cursorUp(1));
      // 光标下移一行
      process.stdout.write(ansiEscapes.cursorDown(1))
      // 光标移动到当前行第二列
      process.stdout.write(ansiEscapes.cursorTo(2))
      if (this.value === item) {
        process.stdout.write(chalk.blue('❯') + ' ' + item)
      } else {
        process.stdout.write(' ' + item)
      }
    }
    process.stdout.write(ansiEscapes.cursorRestorePosition)
  }
}