import * as d3_shape from 'd3-shape';


export default {

    defaults (plot) {
        return {
            lineWidth: 1,
            colorOpacity: 1,
            curve: 'cardinalOpen',
            color: plot.color(this)
        };
    },

    draw (plot, sheet, series) {
        var data = series[0].data(),
            aesthetics = this.aesthetics,
            path = plot.path(this, sheet).data([data]),
            x = this.scaled(this.accessor(plot.x || 'x'), plot.scalex || 'x'),
            y = this.scaled(this.accessor(plot.y || 'y'), 'y'),
            line = d3_shape.line().x(x).y(y).curve(curve(this, aesthetics.curve)),
            width = sheet.dim(aesthetics.lineWidth),
            merge = plot.transition('update');

        path
            .enter()
                .append('path')
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr('stroke', aesthetics.color)
                .attr('stroke-opacity', 0)
                .attr('stroke-width', width)
            .merge(path)
                .transition(merge)
                .attr('stroke', aesthetics.color)
                .attr('stroke-opacity', aesthetics.colorOpacity)
                .attr('stroke-width', width)
                .attr('d', line);

        path
            .exit()
            .remove();
    }
};


export function curve (layer, name) {
    var obj = d3_shape[curveName(name)];
    if (!obj) {
        layer.logger.warn(`Could not locate curve type "${name}"`);
        name = curveName(layer.defaults().curveName);
        obj = d3_shape[name];
    }
    return obj;
}


function curveName (name) {
    if (name.substring(0, 5) !== 'curve')
        name = 'curve' + name[0].toUpperCase() + name.substring(1);
    return name;
}
