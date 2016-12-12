import layers from './core/layer';
import plots from './core/plot';
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
