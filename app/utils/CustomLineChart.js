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
            const lineColor = this.options.custom_line.color;
            const lineWidth = this.options.custom_line.width;
            const lineDashLength = this.options.custom_line.dash_length;
            const lineDashGap = this.options.custom_line.dash_gap;
            
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([lineDashLength, lineDashGap]);
            ctx.moveTo(x, bottomY);
            ctx.lineTo(x, topY);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            ctx.stroke();
            ctx.restore();
        }
    }
}

CustomLineChart.id = 'customLineChart';
CustomLineChart.defaults = LineController.defaults;

export default CustomLineChart;
