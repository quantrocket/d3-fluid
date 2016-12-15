import {assign} from 'd3-let';
import protoChild from '../utils/child';
import paper from '../core/paper';
import plots from '../core/plot';
import layers from '../core/layer';

paper.events.on('init.mapping', setMapping);
plots.events.on('init.mapping', plotMapping);
layers.events.on('init.mapping', layerMapping);


const defaultMapping = {
    x: {
        from: 'default.x'
    },
    y: {
        from: 'default.y'
    },
    theta: {
        from: 'default.theta'
    },
    radius: {
        from: 'default.theta'
    },
};


function setMapping (options) {
    this.mapping = assign({}, defaultMapping, options.mapping);
}

function plotMapping (options) {
    this.mapping = protoChild(this.paper.mapping, options.mapping);
}

function layerMapping (options) {
    this.mapping = protoChild(this.plot.mapping, options.mapping);
}

