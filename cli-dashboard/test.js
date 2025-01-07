import si from 'systeminformation'

si.currentLoad(data => {
  // console.log(data)
})
// 获取file system 文件系统信息
si.fsSize('', data => {
  // console.log(data)
})
// 获取内存总大小，已使用多少
si.mem(data => {
  // console.log(data)
})
// 获取网速
si.networkInterfaceDefault(iface => {
  // console.log('iface', iface)
  // si.networkStats(iface, data => {
  //   console.log(data)
  // })
})
// 获取进程列表
si.processes(data => {
  console.log(data)
})