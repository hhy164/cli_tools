import si from 'systeminformation'
import contrib from 'blessed-contrib'

const parts: Record<string, any> = {
  p: 'pid',
  c: 'cpu',
  m: 'mem'
}

export default class ProcessMonitor {
  table: contrib.Widgets.TableElement;

  timer: NodeJS.Timer | null = null;
  pSort: string = parts.c;
  reIndex: boolean = false;
  reverse: boolean = false;

  constructor(table: contrib.widget.Table) {
    this.table = table;
  }

  init() {
    const updater = () => {
      si.processes(data => {
        this.updateData(data)
      })
    }
    updater();
    this.timer = setInterval(updater, 1000)
    this.table.screen.key(['m', 'c', 'p'], (ch) => {
      if (parts[ch] == this.pSort) {
        this.reverse = !this.reverse
      } else {
        this.pSort = parts[ch] || this.pSort
      }
      this.reIndex = true;
      updater()
    })
  }

  updateData(data: si.Systeminformation.ProcessesData) {
    const part = this.pSort;
    const list = data.list.sort(function (a: any, b: any) {
      return b[part] - a[part]
    }).map(p => {
      return [
        p.pid + '',
        p.command,
        ' ' + p.cpu.toFixed(1),
        p.mem.toFixed(1)
      ]
    })
    const headers = ['PID', 'Command', '%COU', '%MEM'];
    const position = {
      pid: 0,
      cpu: 2,
      mem: 3
    }[this.pSort]!
    headers[position] += this.reverse ? '▲' : '▼';

    this.table.setData({
      headers,
      data: this.reverse ? list.reverse() : list
    })
    if (this.reIndex) {
      (this.table as any).rows.select(0)
      this.reIndex = false;
    }
    this.table.screen.render();
  }
}