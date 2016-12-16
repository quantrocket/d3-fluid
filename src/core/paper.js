import {select} from 'd3-canvas-transition';
import {viewUid, viewModel} from 'd3-view';
import {isFunction, inBrowser, assign} from 'd3-let';
import {dispatch} from 'd3-dispatch';

import {getSize, boundingBox} from '../utils/size';
import plots from './plot';
import newSheet from './sheet';


export default function paper (element, options) {
    return new Paper(element, options);
}


function Paper (element, options) {
    if (!options) options = {};
    element = getElement(element);

    var type = options.type || 'canvas',
        config = viewModel(),
        sheets = [];

    select(element)
            .append('div')
            .attr('id', viewUid(this, 'p').uid)
            .classed('d3-paper', true)
            .classed('d3-paper-' + type, true);

    this.name = options.name || '<noname>';
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
        },
        config: {
            get () {
                return config;
            }
        }
    });
    paper.live.push(this);
    paper.events.call('init', this, options);
    // Initialise paper plots
    plots.init(this, options.plots);
}


Paper.prototype = paper.prototype = {

    draw () {
        this.sheets.forEach(function () {
            this.draw();
        });
    },

    toJson () {
        var json = {
            name: this.name,
            sheets: []
        };
        this.sheets.forEach(function () {
            json.sheets.push(this.toJson());
        });
        paper.events.call('json', this, json);
        return json;
    },

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
        if (idx > -1) {
            paper.live.splice(idx, 1);
            this.config.$off();
        }
    }
};

// Paper globals
paper.events = dispatch('init', 'before-draw', 'after-draw');
paper.live = [];
paper.constants = (inBrowser ? window.fluidPaper : null) || {};


function getElement (element) {
    if (!element) {
        element = document.createElement('div');
    } if (isFunction(element.node))
        element = element.node();
    return element;
}
