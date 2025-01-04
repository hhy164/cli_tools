import si from 'systeminformation';
const colors = ['magenta', 'cyan', 'blue', 'yellow', 'green', 'red'];
export default class MemoryMonitor {
    constructor(line, memDonut, swapDonut) {
        this.memData = [];
        this.timer = null;
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
            ];
            this.updateData(data);
            this.timer = setInterval(() => {
                si.mem((data) => {
                    this.updateData(data);
                });
            }, 1000);
        });
    }
    updateData(data) {
        let memPer = +(100 * (1 - data.available / data.total)).toFixed();
        let swapPer = +(100 * (1 - data.swapfree / data.swaptotal)).toFixed();
        swapPer = isNaN(swapPer) ? 0 : swapPer;
        this.memData[0].y.shift();
        this.memData[0].y.push(memPer);
        this.memData[1].y.shift();
        this.memData[1].y.push(memPer);
        this.lineChart.setData(this.memData);
        this.memDonut.setData([
            {
                percent: memPer / 100,
                label: '',
                color: colors[0]
            }
        ]);
        this.swapDonut.setData([
            {
                percent: swapPer / 100,
                label: '',
                color: colors[1]
            }
        ]);
        this.lineChart.render();
        this.memDonut.render();
        this.swapDonut.render();
    }
}
