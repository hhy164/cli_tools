import si from 'systeminformation'
import contrib from 'blessed-contrib'

const colors = ['magenta', 'cyan', 'blue', 'yellow', 'green', 'red']

type CpuData = {
  title: string;
  style: {
    line: string;
  }
  x: number[],
  y: number[]
}

export default class CpuMonitor {
  lineChart: contrib.Widgets.PictureElement;
  cpuData: CpuData[] = []; 
  timer: NodeJS.Timeout | null = null; // 计时器
  constructor(line: contrib.Widgets.PictureElement) {
    this.lineChart = line;
  }
  init() {
    // 获取当前cpu负载
    si.currentLoad(data => {
      this.cpuData = data.cpus.map((cpu, i) => {
        return {
          title: 'CPU' + (i + 1),
          style: {
            line: colors[i % colors.length]
          },
          x: Array(65).fill(0).map((_, i) => 65 - i),
          y: Array(60).fill(0)
        }
      })

      this.updateData(data);
      this.timer = setInterval(() => {
        // 每秒重新获取
        si.currentLoad(data => {
          this.updateData(data)
        })
      }, 1000)
    })
  }

  updateData(data: si.Systeminformation.CurrentLoadData) {
    data.cpus.forEach((cpu, i) => {
      // 当前核的总使用率
      let loadString = cpu.load.toFixed(1).toString()
      while (loadString.length < 6) {
        loadString = ' ' + loadString
      }
      loadString = loadString + '%';
      this.cpuData[i].title = 'CPU' + (i + 1) + loadString;
      // 左移效果，删除最前端的值，后续再push一个值
      this.cpuData[i].y.shift()
      this.cpuData[i].y.push(cpu.load);
    })
    this.lineChart.setData(this.cpuData)
    this.lineChart.screen.render()
  }
}