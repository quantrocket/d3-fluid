import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import node from 'rollup-plugin-node-resolve';


export default {
    entry: 'build/bundle.js',
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
        }),
        node()
    ],
    dest: 'dist/d3-fluid-bundle.js'
};
