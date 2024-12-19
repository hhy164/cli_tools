import readLine from 'node:readline';
// 启用按键事件
readLine.emitKeypressEvents(process.stdin);
// 设置原始模式，使得输入不会被缓冲
// 原始模式: 可以让输入流立即发送按键事件，而不是等待用户按下回车。
// 按下control+c也不会退出终端
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    console.log(str, key);
    // 按住control+c设置退出
    if (key.sequence === '\x03') {
        process.exit();
    }
});
