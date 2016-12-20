import {map} from 'd3-collection';
import {assign} from 'd3-let';
import * as d3 from 'd3-scale';

import capfirst from '../utils/capfirst';


const scaleProto = {

    scale () {
        var transform = this.transform || 'linear';
        var scaleFunction = d3['scale' + capfirst(transform)];
        var scale = scaleFunction();
        if (this.nice) scale.nice();
        return scale.range(this.range()).domain(this.domain());
    },

    // return the scale range, must be implemented by scales
    domain () {
        return this.plot.coord[this.type];
    },

    // return the scale range, must be implemented by scales
    range () {}
};


// Scale factory container
export default assign(map(), {

    add (type, scale) {

        function Scale (plot, options) {
            initScale(this, type, plot, options);
        }

        Scale.prototype = assign({}, scaleProto, scale);

        this.set(type, Scale);
        return this.get(type);
    }
});


function initScale (scale, type, plot, options) {
    scale.options = options || {};

    Object.defineProperties(scale, {
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
