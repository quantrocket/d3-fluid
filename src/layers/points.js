import {symbol} from 'd3-shape';


export default {

    defaults () {
        return {
            symbol: 'circle',
            fill: true,
            fillOpacity: 1,
            colorOpacity: 1,
            lineWidth: 2,
            size: 60
        };
    },

    draw (plot, sheet, series) {
        var data = series[0].data(),
            aesthetics = this.aesthetics,
            path = plot.path(this, sheet).data([data]),
            x = this.scaled(this.accessor(plot.x || 'x'), plot.scalex || 'x'),
            y = this.scaled(this.accessor(plot.y || 'y'), 'y'),
            size = this.accessor(),
            marks = symbol().size(size),
            fill = aesthetics.fill,
            opacity = aesthetics.fillOpacity,
            merge = plot.transition('update');

        path
            .enter()
                .append('path')
                .attr('class', 'points')
                .attr('transform', sheet.translate(x, y))
                .attr('fill', fill)
                .attr('fill-opacity', 0)
            .merge(path)
                .transition(merge)
                .attr('transform', sheet.translate(x, y))
                .attr('fill', fill)
                .attr('fill-opacity', opacity)
                .attr('d', marks);

        path
            .exit()
            .remove();
    }
};
