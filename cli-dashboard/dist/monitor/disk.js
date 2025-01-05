import si from 'systeminformation';
export default class DiskMonitor {
    constructor(donut) {
        this.timer = null;
        this.donut = donut;
    }
    init() {
        si.fsSize(data => {
            this.updateData(data);
            this.timer = setInterval(() => {
                si.fsSize('', data => {
                    this.updateData(data);
                });
            }, 1000);
        });
    }
    updateData(data) {
        // 总空间大小
        let total = data[0].size;
        // 已使用空间大小
        let used = total - data[0].available;
        const label = this.formatSize(used) + ' of ' + this.formatSize(total);
        this.donut.setData([
            {
                percent: used / total,
                label,
                color: 'green'
            }
        ]);
        this.donut.screen.render();
    }
    formatSize(bytes) {
        if (bytes == 0) {
            return '0.00 B';
        }
        const gb = bytes / 1000 / 1000 / 1000;
        if (gb > 1000) {
            return (gb / 1000).toFixed(2) + 'TB';
        }
        return gb.toFixed(2) + 'GB';
    }
    ;
}
