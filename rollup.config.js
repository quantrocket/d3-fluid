import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';


export default {
    entry: 'index.js',
    format: 'umd',
    moduleName: 'd3',
    moduleId: 'd3-fluid',
    plugins: [
        json(),
        babel({
            babelrc: false,
            presets: ['es2015-rollup']
        }),
        commonjs({
            include: [
                'node_modules/crossfilter/**'
            ]
        })
    ],
    dest: 'build/d3-fluid.js',
    globals: {
        "d3-collection": "d3",
        "d3-dispatch": "d3",
        "d3-let": "d3",
        "d3-selection": "d3",
        "d3-shape": "d3",
        "d3-timer": "d3",
        "d3-transition": "d3",
        "d3-canvas-transition": "d3",
        "d3-view": "d3"
    }
};
