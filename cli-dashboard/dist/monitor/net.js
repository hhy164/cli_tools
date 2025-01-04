import si from 'systeminformation';
export default class NetMonitor {
    constructor(line) {
        this.timer = null;
        this.netData = [];
        this.sparkLine = line;
    }
    init() {
        this.netData = Array(60).fill(0);
        si.networkInterfaceDefault(iface => {
            const updater = () => {
                si.networkStats(iface, data => {
                    this.updateData(data[0]);
                });
            };
            updater();
            this.timer = setInterval(updater, 1000);
        });
    }
    updateData(data) {
        // 每秒接收的字节数
        const rx_sec = Math.max(0, data['rx_sec']);
        this.netData.shift();
        this.netData.push(rx_sec);
        const rx_label = `Receiving: ${this.formatSize(rx_sec)}\nTotal received: ${this.formatSize(data['rx_bytes'])}`;
        this.sparkLine.setData([rx_label], [this.netData]);
        this.sparkLine.screen.render();
    }
    formatSize(bytes) {
        if (bytes === 0) {
            return '0.00 B';
        }
        if (bytes < 1024) {
            return Math.floor(bytes) + ' B';
        }
        let num = bytes / 1024; // kb
        if (num > 1024) {
            return (num / 1024).toFixed(2) + ' MB';
        }
        return num.toFixed(2) + ' KB';
    }
}
