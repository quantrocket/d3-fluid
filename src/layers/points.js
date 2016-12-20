import capfirst from '../utils/capfirst';

import * as d3 from 'd3-shape';


export default {

    defaults: {
        symbol: 'circle',
        fill: true,
        color: true,
        fillOpacity: 1,
        colorOpacity: 1,
        lineWidth: 2,
        size: 60
    },

    draw (serie) {
        var cfg = this.config,
            plot = this.plot,
            data = serie.natural.top(Infinity),
            mapping = this.mapping,
            x = plot.mapper(mapping.x, 'x'),
            y = plot.mapper(mapping.y, 'y'),
            size = plot.mapper(mapping.size, 'xy', cfg.size),
            color = plot.mapper(mapping.color, 'color', cfg.color),
            fill = plot.mapper(mapping.fill, 'fill', cfg.fill),
            type = plot.mapper(mapping.symbol, null, cfg.symbol),
            fillOpacity = plot.mapper(mapping.fillOpacity, null, cfg.fillOpacity),
            strokeOpacity = plot.mapper(mapping.colorOpacity, null, cfg.colorOpacity),
            lineWidth = plot.mapper(mapping.lineWidth, null, cfg.lineWidth),
            marks = d3.symbol().size(size).type(symbol(type)),
            group = plot.group(this),
            path = group.selectAll('path.points').data(data);
            //merge = plot.transition(this, 'update');

        path
            .enter()
                .append('path')
                .attr('class', 'points')
                .attr('transform', plot.translate(x, y))
                .attr('fill', fill)
                .attr('fill-opacity', 0)
                .attr('stroke', color)
                .attr('stroke-opacity', 0)
                .attr('stroke-width', lineWidth)
            .merge(path)
                //.transition(merge)
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


function symbol (get) {
    var s;
    return function () {
        s = get.apply(this, arguments);
        return d3['symbol' + capfirst(s)];
    };
}
