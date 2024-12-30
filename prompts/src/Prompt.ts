import ansiEscapes from 'ansi-escapes';
import EventEmitter from 'events';
import readline from "node:readline"

export interface Key {
  name: string;
  sequence: string;
}
let onKeypress: (str: string, key: Key) => void;
/**
 *  abstract定义抽象类，抽象类-不能被实例化(不可以new) 
 *  抽象类一般作为其他类的父类，用于定义通用的行为或接口
 */
export abstract class Prompt extends EventEmitter {
  value = ''
  rl: readline.Interface | undefined
  constructor() {
    super()
    /**
     * 用于将标准输入(process.stdin)上的按键事件转化为keypress事件
     * 默认情况下，按键输入不会触发keypress事件
     * 与readline的逐行输入不同，这种方式可以捕获实时的按键事件，而无需等待用户按下回车
     */
    readline.emitKeypressEvents(process.stdin)
    this.rl = readline.createInterface({ input: process.stdin })
    process.stdin.setRawMode(true)
    onKeypress = this.onKeypress.bind(this)
    process.stdin.on('keypress', this.onKeypress)
  }

  /**
   * abstract定义抽象方法，这意味着该方法是一个没有具体实现的方法
   * 必须由继承该抽象类的子类来实现
   */
  abstract onKeyInput(str: string, key: Key): void;

  private onKeypress(str: string, key: Key) {
    if (key.sequence === '\x03') {
      process.exit()
    }
    if (key.name === 'return') {
      this.close()
    }
    this?.onKeyInput(str, key)
  }

  public close() {
    // 换行
    process.stdout.write('\n')
    // 移除监听事件
    process.stdin.removeListener('keypress', onKeypress)
    process.stdin.setRawMode(false)
    // 关闭readline.Interface实例，释放输入输出流
    this.rl?.close()
    // 触发submit事件
    this.emit('submit', this.value)
  }
}