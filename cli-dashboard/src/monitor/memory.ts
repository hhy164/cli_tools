import si from 'systeminformation'
import contrib from 'blessed-contrib'

const colors = ['magenta', 'cyan', 'blue', 'yellow', 'green', 'red']

type ChartType = contrib.Widgets.PictureElement;

type MemData = {
  title: string;
  style: {
    line: string;
  }
  x: number[]
  y: number[]
}

export default class MemoryMonitor {
  lineChart: ChartType;
  memDonut: ChartType;
  swapDonut: ChartType;

  memData: MemData[] = [];
  timer: NodeJS.Timer | null = null;
  constructor(line: ChartType, memDonut: ChartType, swapDonut: ChartType) {
    this.lineChart = line;
    this.memDonut = memDonut;
    this.swapDonut = swapDonut;
  }
  init() {
    si.mem(data => {
      this.memData = [
        {
          title: 'Memory',
          style: {
            line: colors[0]
          },
          x: Array(65).fill(0).map((_, i) => 65 - i),
          y: Array(60).fill(0)
        }, {
          title: 'Swp',
          style: {
            line: colors[1]
          },
          x: Array(65).fill(0).map((_, i) => 65 - i),
          y: Array(60).fill(0)
        }
      ]
      this.updateData(data)
      this.timer = setInterval(() => {
        si.mem((data) => {
          this.updateData(data)
        })
      }, 1000)
    })
  }
  updateData(data: si.Systeminformation.MemData) {
    let memPer = +(100 * (1 - data.available / data.total)).toFixed()
    let swapPer = +(100 * (1 - data.swapfree / data.swaptotal)).toFixed()
    swapPer = !!swapPer ? 0 : swapPer;

    this.memData[0].y.shift();
    this.memData[0].y.push(memPer)

    this.memData[1].y.shift();
    this.memData[1].y.push(memPer)

    this.lineChart.setData(this.memData)

    const memLabel = this.formatSize(data.total - data.available) + ' of ' + this.formatSize(data.total)
    const swapLabel = this.formatSize(data.swaptotal - data.swapfree) + ' of ' + this.formatSize(data.swaptotal)
    this.memDonut.setData([
      {
        percent: memPer ? memPer / 100 : 0,
        label: memLabel,
        color: colors[0]
      }
    ])
    this.swapDonut.setData([
      {
        percent: swapPer ? swapPer / 100 : 0,
        label: swapLabel,
        color: colors[1]
      }
    ])

    this.lineChart.render()
    this.memDonut.render()
    this.swapDonut.render()
  }
  formatSize(bytes: number) {
    if (bytes == 0) {
      return '0.00 B';
    }
    const gb = bytes / 1024 / 1024 / 1024;
    return gb.toFixed(2) + ' GB'
  };
}