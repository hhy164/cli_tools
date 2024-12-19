import readLine from 'node:readline'
// 启用按键事件
readLine.emitKeypressEvents(process.stdin);
// 设置原始模式，使得输入不会被缓冲
// 原始模式: 可以让输入流立即发送按键事件，而不是等待用户按下回车。
process.stdin.setRawMode(true)
process.stdin.on('keypress',(str,key)=>{
  console.log(str,key)
})