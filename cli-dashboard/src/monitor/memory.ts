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

class MemoryMonitor {
  lineChart: ChartType
  constructor(line: ChartType) {
    this.lineChart = line;
  }
  init() {

  }
}