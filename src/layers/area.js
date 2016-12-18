import {area} from 'd3-shape';
// import {stackOrderNone, stackOffsetNone, area} from 'd3-shape';
import {curve} from './line';


export default {

    defaults: {
        // stackOrder: stackOrderNone,
        // stackOffset: stackOffsetNone,
        fillOpacity: 0.7,
        colorOpacity: 1,
        lineWidth: 1,
        background: true
    },

    draw (plot, sheet, series) {
        var data = series[0].data(),
            aesthetics = this.aesthetics,
            path = plot.path(this, sheet).data([data]),
            x = this.scaled(this.accessor(plot.x || 'x'), plot.scalex || 'x'),
            y = this.scaled(this.accessor(plot.y || 'y'), 'y'),
            draw = area().x(x).y(y).curve(curve(aesthetics.curve)),
            width = sheet.dim(aesthetics.lineWidth),
            merge = plot.transition('update');

        path
            .enter()
                .append('path')
                .attr('class', 'area')
                .attr('fill', 'none')
                .attr('stroke', aesthetics.color)
                .attr('stroke-opacity', 0)
                .attr('stroke-width', width)
            .merge(path)
                .transition(merge)
                .attr('stroke', aesthetics.color)
                .attr('stroke-opacity', aesthetics.colorOpacity)
                .attr('stroke-width', width)
                .attr('d', draw);

        path
            .exit()
            .remove();
    }
};
