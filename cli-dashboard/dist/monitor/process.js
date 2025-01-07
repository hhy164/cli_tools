import si from 'systeminformation';
const parts = {
    p: 'pid',
    c: 'cpu',
    m: 'mem'
};
export default class ProcessMonitor {
    constructor(table) {
        this.timer = null;
        this.pSort = parts.c;
        this.reIndex = false;
        this.reverse = false;
        this.table = table;
    }
    init() {
        const updater = () => {
            si.processes(data => {
                this.updateData(data);
            });
        };
        updater();
        this.timer = setInterval(updater, 1000);
        this.table.screen.key(['m', 'c', 'p'], (ch) => {
            if (parts[ch] == this.pSort) {
                this.reverse = !this.reverse;
            }
            else {
                this.pSort = parts[ch] || this.pSort;
            }
            this.reIndex = true;
            updater();
        });
    }
    updateData(data) {
        const part = this.pSort;
        const list = data.list.sort(function (a, b) {
            return b[part] - a[part];
        }).map(p => {
            return [
                p.pid + '',
                p.command,
                ' ' + p.cpu.toFixed(1),
                p.mem.toFixed(1)
            ];
        });
        const headers = ['PID', 'Command', '%COU', '%MEM'];
        const position = {
            pid: 0,
            cpu: 2,
            mem: 3
        }[this.pSort];
        headers[position] += this.reverse ? '▲' : '▼';
        this.table.setData({
            headers,
            data: this.reverse ? list.reverse() : list
        });
        if (this.reIndex) {
            this.table.rows.select(0);
            this.reIndex = false;
        }
        this.table.screen.render();
    }
}
