import layers from './core/layer';
import plots from './core/plot';
import scales from './core/scale';
import points from './layers/points';
import line from './layers/line';
import area from './layers/area';

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

scales.add('y', {
    nice: true,

    range () {
        return [this.plot.innerHeight, 0];
    }
});

scales.add('color', {
    nice: true,

    domain () {

    }
});
