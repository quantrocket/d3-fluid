import {symbol} from 'd3-shape';


export default {

    defaults: {
        symbol: 'circle',
        fill: true,
        fillOpacity: 1,
        colorOpacity: 1,
        lineWidth: 2,
        size: 60
    },

    aesthetics: ['x', 'y', 'symbol', 'size', 'fill', 'color'],

    draw (plot, data) {
        var cfg = this.config,
            x = plot.scaled(this.mapping.x, data, 'x'),
            y = plot.scaled(this.mapping.y, data, 'y'),
            size = plot.scaled(this.mapping.size, data, 'xy'),
            color = plot.scaled(this.mapping.color, data, 'color'),
            fill = plot.scaled(this.mapping.fill, data, 'fill'),
            type = data.map(this.mapping.symbol, cfg.symbol),
            marks = symbol().size(size).type(type),
            fillOpacity = data.map(this.mapping.fillOpacity, cfg.fillOpacity),
            strokeOpacity = data.map(this.mapping.colorOpacity, cfg.colorOpacity),
            path = plot.path(this).data([data]),
            merge = plot.transition('update');

        path
            .enter()
                .append('path')
                .attr('class', 'points')
                .attr('transform', plot.translate(x, y))
                .attr('fill', fill)
                .attr('fill-opacity', 0)
                .attr('stroke', color)
                .attr('stroke-opacity', 0)
                .attr('stroke-width', cfg.lineWidth)
            .merge(path)
                .transition(merge)
                .attr('transform', plot.translate(x, y))
                .attr('fill', fill)
                .attr('fill-opacity', fillOpacity)
                .attr('stroke', color)
                .attr('stroke-opacity', strokeOpacity)
                .attr('d', marks);

        path
            .exit()
            .remove();
    }
};
