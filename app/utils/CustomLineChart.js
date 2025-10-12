import { LineController } from 'chart.js';

class CustomLineChart extends LineController {
    draw() {
        super.draw();
        
        if (this.chart.tooltip?._active?.length) {
            const activePoint = this.chart.tooltip._active[0];
            const ctx = this.chart.ctx;
            const x = activePoint.element.x;
            const topY = this.chart.scales.y.top;
            const bottomY = this.chart.scales.y.bottom;
            
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, bottomY);
            ctx.lineTo(x, topY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'oklch(0.442 0.017 285.786)';
            ctx.stroke();
            ctx.restore();
        }
    }
}

CustomLineChart.id = 'customLineChart';
CustomLineChart.defaults = LineController.defaults;

export default CustomLineChart;
