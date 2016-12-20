import layers from './core/layer';
import plots from './core/plot';
import scales from './core/scale';
import coords from './core/coord';
import points from './layers/points';
import line from './layers/line';
import area from './layers/area';
import * as d3 from 'd3-scale';
import './plugins/index';

// Built-in layers
layers.add('points', points);
layers.add('line', line);
layers.add('area', area);

// Built-in plots
plots.add('scatter', {layers: ['points']});
plots.add('line', {layers: ['line']});
plots.add('linepoints', {layers: ['line', 'points']});
plots.add('area', {layers: ['area', 'line']});

//
// Built-in scales
scales.add('x', {
    nice: true,

    range () {
        return [0, this.plot.innerWidth];
    }
});

scales.add('-x', {
    nice: true,

    range () {
        return [this.plot.innerWidth, 0];
    }
});

scales.add('y', {
    nice: true,

    range () {
        return [this.plot.innerHeight, 0];
    }
});

scales.add('xy', {
    nice: true,

    domain () {
        return [0, 100];
    },

    range () {
        return [0, Math.min(this.plot.innerWidth, this.plot.innerHeight)];
    }
});

scales.add('color', {
    domain () {
        return [0, 1];
    },

    range () {
        return d3.schemeCategory20;
    }
});

coords.add('cartesian', {
    axes: ['x', 'y']
});

coords.add('cartesianFlipped', {
    axes: ['y', 'x']
});

// polar coordinate system
coords.add('polar', {
    axes: ['x', 'y'],
    x: {
        range: [0, 2*Math.PI]
    }
});
