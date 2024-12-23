import ansiEscapes from 'ansi-escapes';
import EventEmitter from 'events';
import readline from "node:readline";

export interface Key {
  name: string;
  sequence: string;
}

let onKeypress: (str: string, key: Key) => void;

export abstract class Prompt extends EventEmitter {
  value = '';
  rl: readline.Interface = readline.createInterface({
    input: process.stdin, // 输入流
    output: process.stdout // 输出流
  })
  constructor() {
    super();
    // 监控输入
    readline.emitKeypressEvents(process.stdin);
    // 设置输入为原始模式
    process.stdin.setRawMode(true);
    // 监听键盘按下，执行函数onKeypress
    process.stdin.on('keypress', onKeypress);
  }

  abstract onKeyInput(str: string, key: Key): void;

  onKeypress(str: string, key: Key) {
    if (key.sequence === '\x03') {
      process.exit()
    }
    // 按住enter键
    if (key.name === 'return') {
      this.close()
      return;
    }
    this.onKeyInput(str, key)
  }
  close() {
    process.stdout.write('\n');
    process.stdin.removeListener('keypress', onKeypress)
    process.stdin.setRawMode(false)
    this.rl.close()
    this.emit('submit', this.value)
  }

}