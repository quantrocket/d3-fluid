import {select} from 'd3-canvas-transition';
import {viewUid, viewModel, viewWarn as warn} from 'd3-view';
import {isFunction, inBrowser, isString, isArray, isObject, assign} from 'd3-let';
import {dispatch} from 'd3-dispatch';

import {getSize, boundingBox} from '../utils/size';
import plots from './plot';
import newSheet from './sheet';


export default function paper (element, options) {
    if (arguments.length === 1 && isObject(element)) {
        options = element;
        element = null;
    }
    return new Paper(element, options);
}

//
// Paper object is a container of plot objects
function Paper (element, options) {
    if (!options) options = {};
    element = getElement(element);

    var self = this,
        type = options.type || 'canvas',
        plots = [],
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
        plots: {
            get () {
                return plots;
            }
        },
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
    if (options.plots) {
        var plots = options.plots;
        if (!isArray(plots)) plots = [plots];
        plots.forEach(function (opts) {
            self.addPlot(opts);
        });
    }
}


Paper.prototype = paper.prototype = {

    addPlot (options) {
        if (isString(options)) options = {type: options};
        var Plot = plots.get(options.type);
        if (!Plot) warn(`Plot type "${options.type}" not available`);
        else {
            var plot = new Plot(this, options);
            this.plots.push(plot);
            return plot;
        }
    },

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
