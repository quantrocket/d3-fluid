import {select} from 'd3-canvas-transition';
import {viewUid} from 'd3-view';
import {isFunction, isBrowser, assign} from 'd3-let';
import {dispatch} from 'd3-dispatch';

import {getSize, boundingBox} from '../utils/size';
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

    assign(this, getSize(element, options));

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
        },
        size: {
            get () {
                return [this.width, this.height];
            }
        }
    });
    paper.live.push(this);
    paper.events.call('init', this, options);
}


Paper.prototype = paper.prototype = {

    addSheet () {
        var sheet = newSheet(this);
        this.sheets.push(sheet);
        return sheet;
    },

    /**
     * Resize the paper if it needs resizing
     */
    resize (size) {
        if (!size) size = boundingBox(this);
        var currentSize = this.size;

        if (currentSize[0] !== size[0] || currentSize[1] !== size[1]) {
            this.width = size[0];
            this.height = size[1];
            paper.events.call('before-draw', this);
            this.draw();
            paper.events.call('after-draw', this);
        }
        return this;
    },

    clear () {
        this.sheets.forEach(function () {
            this.clear();
        });
    },

    destroy () {
        var idx = paper.live.indexOf(this);
        if (idx > -1) paper.live.splice(idx, 1);
    }
};

// Paper globals
paper.events = dispatch('init', 'before-draw', 'after-draw');
paper.live = [];
paper.constants = (isBrowser ? window.fluidPaper : null) || {};


function getElement (element) {
    if (!element) {
        element = document.createElement('div');
    } if (isFunction(element.node))
        element = element.node();
    return element;
}
