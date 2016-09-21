import {line} from 'd3-shape';
import {viewWarn as warn} from 'd3-view';
import * as d3_shape from 'd3-shape';

export default {

    defaults ()  {
        return {
            color: true,
            curve: 'CardinalOpen',
            lineWidth: 1,
            colorOpacity: 1
        };
    },

    draw (layer) {
        var scope = this.$scope,
            x = this.scaled(this.accessor(layer.x || 'x'), scope.scalex || 'x'),
            y = this.scaled(this.accessor(layer.y || 'y'), 'y'),
            mark = line().x(x).y(y).curve(this.curve()),
            group = layer.group(this),
            path = group.selectAll('path.line').data(layer.data),
            color = scope.color;

        path.enter()
                .append('path')
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr('stroke', color)
                .attr('stroke-opacity', 0)
                .attr('stroke-width', scope.width)
            .merge(path)
                //.transition(merge)
                .attr('stroke', color)
                .attr('stroke-opacity', scope.colorOpacity)
                .attr('stroke-width', scope.width)
                .attr('d', mark);

        path
            .exit()
            .remove();
    },

    curve () {
        var name = curveName(this.$scope.curve);
        var obj = d3_shape[name];
        if (!obj) {
            warn(`Could not locate curve type "${name}"`);
            obj = d3_shape[curveName(this.defaults.curve)];
        }
        return obj;
    }

};


function curveName (name) {
    if (name.substring(0, 5) !== 'curve')
        name = 'curve' + name[0].toUpperCase() + name.substring(1);
    return name;
}
