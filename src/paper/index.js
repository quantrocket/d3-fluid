import {select} from 'd3-canvas-transition';
import {viewUid} from 'd3-view';
import {isFunction} from 'd3-let';

import newSheet from './sheet';
import layers from './layer';
import plots from './plot';
import points from '../layers/points';
import line from '../layers/line';
import area from '../layers/area';

// Built-in layers
layers.add('points', points);
layers.add('line', line);
layers.add('area', area);

// Built-in plots
plots.add('scatter', ['points']);
plots.add('line', ['line']);
plots.add('linepoints', ['line', 'points']);
plots.add('area', ['area', 'line']);


export default function paper (options) {
    return new Paper(options);
}


function Paper (element, options) {
    if (!options) options = {};
    element = getElement(element);

    var type = options.type || 'canvas',
        sheets = [];

    select(element)
            .append('div')
            .attr('id', viewUid(this, 'p').uid)
            .classed('d3-paper', true)
            .classed('d3-paper-' + type, true);

    Object.defineProperties(this, {
        sheets: {
            get () {
                return sheets;
            }
        },
        type: {
            get () {
                return type;
            }
        },
        element: {
            get () {
                return select(element);
            }
        },
        container: {
            get () {
                return this.element.select('#' + this.uid);
            }
        }
    });
}


Paper.prototype = paper.prototype = {

    addSheet () {
        var sheet = newSheet(this);
        this.sheets.push(sheet);
        return sheet;
    }
};


function getElement (element) {
    if (!element) {
        element = document.createElement('div');
    } if (isFunction(element.node))
        element = element.node();
    return element;
}
