// Coordinate system
import {map} from 'd3-collection';
import {assign} from 'd3-let';
import {viewWarn as warn} from 'd3-view';
import {extent} from 'd3-array';


const defaultSystem = 'cartesian';

const coordProto = {
    axes: [],

    domains (data) {
        var coord = this,
            plot = this.plot,
            done = {},
            domain,
            field;

        this.axes.forEach((axis) => {
            domain = [+Infinity, -Infinity];

            plot.layers.forEach((layer) => {
                field = layer.mapping[axis].from;

                if (field) {
                    if (!done[field])
                        done[field] = extent(data, (d) => d[field]);

                    domain[0] = Math.min(domain[0], done[field][0]);
                    domain[1] = Math.max(domain[1], done[field][1]);
                }
            });
            coord[axis] = domain;
        });
    },
};


// Scale factory container
export default assign(map(), {

    add (type, coord) {

        function Coord (plot) {
            initCoord(this, type, plot);
        }

        Coord.prototype = assign({}, coordProto, coord);

        this.set(type, Coord);
        return this.get(type);
    },

    create (plot, type) {
        type = type || defaultSystem;
        var Coord = this.get(type);
        if (!Coord) {
            warn(`Coordinate system ${type} not available`);
            Coord = this.get(defaultSystem);
        }
        return new Coord(plot);
    }
});


function initCoord (coord, type, plot) {

    Object.defineProperties(coord, {
        type: {
            get () {
                return type;
            }
        },
        plot: {
            get () {
                return plot;
            }
        }
    });
}
