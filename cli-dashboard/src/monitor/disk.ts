import si from 'systeminformation'
import contrib from 'blessed-contrib'

type ChartType = contrib.Widgets.PictureElement;

type FsSizeData = si.Systeminformation.FsSizeData;

class DiskMonitor {
  donut: ChartType;
  timer: NodeJS.Timer | null
  constructor(donut: ChartType) {
    this.donut = donut;
  }
  init() {
  }
  updateData() {

  }
}