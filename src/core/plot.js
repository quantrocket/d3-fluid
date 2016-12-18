import {map} from 'd3-collection';
import {dispatch} from 'd3-dispatch';
import {viewProviders, viewWarn as warn} from 'd3-view';
import {assign, isString} from 'd3-let';

import layers from './layer';
import scales from './scale';

var plotCount = 0;
var plotEvents = dispatch('init', 'before-draw', 'after-draw');


const plotProto = {
    layers: [],

    addLayer (options) {
        if (isString(options)) options = {type: options};

        var Layer = layers.get(options.type);
        if (!Layer) warn(`Layer type "${options.type}" not available`);
        else {
            addLayerConfig(this, options.type);
            var layer = new Layer(this, options);
            this.layers.push(layer);
            return layer;
        }
    },

    addScale (options) {
        if (isString(options)) options = {type: options};
        var Scale = scales.get(options.type);
        if (!Scale) warn(`Scale type "${options.type}" not available`);
        else {
            var scale = new Scale(options);
            this.scales.set(scale.type, scale);
            return scale;
        }
    },

    // get the data serie associated with this plot
    getSeries () {
        return this.paper.data;
    },

    // Return a group element for a plot layer
    group (paper, layer) {
        var sheet = paper.plotSheet;
        var group = sheet.selection().selectAll('.' + layer.uid).data([layer]);
        return group;
    },

    // Draw a plot on a paper
    draw () {
        var plot = this,
            series = this.getSeries();

        this.layers.forEach((layer) => {
            if (layer.canDraw(plot, series)) {
                layers.events.call('before-draw', layer, plot, series);
                viewProviders.logger.info(`Drawing ${layer.type} layer from series ${series.toString()}`);
                layer.draw(plot, series);
                layers.events.call('after-draw', layer, plot, series);
            }
        });
    },

    scaled (mapping, data, scale) {
        var plotScale = this.scales.get(scale);
        var mapped = data.map(mapping);
        if (!plotScale) warn(`plot scale "${scale}" not available`);
        else mapped = plotScale.apply(mapped);
        return mapped;
    },

    destroy () {

    }
};


//
// Plot factory object
export default assign(map(), {
    events: plotEvents,

    //
    // add a new plot class to the factory
    add (type, plot) {

        function Plot (paper, options) {
            initPlot(this, type, paper, options);
        }

        Plot.prototype = assign({}, plotProto, plot);

        this.set(type, Plot);
    }
});


// A Plot is the combination is a visualisation on a paper
export function initPlot (plot, type, paper, options) {
    var protoLayers = plot.layers,
        plotLayers = [],
        scales = map(),
        config = paper.config.$new({layers: {}}),
        name = options.name;

    ++plotCount;

    if (!name) name = 'plot' + plotCount;

    Object.defineProperties(plot, {
        config: {
            get () {
                return config;
            }
        },
        layers: {
            get () {
                return plotLayers;
            }
        },
        name: {
            get () {
                return name;
            }
        },
        paper: {
            get () {
                return paper;
            }
        },
        scales: {
            get () {
                return scales;
            }
        },
        type: {
            get () {
                return type;
            }
        }
    });

    plotEvents.call('init', plot, options);

    protoLayers.forEach(function (opts) {
        if (isString(opts)) opts = {type: opts};
        // Add layer information in plot configuration
        addLayerConfig(plot, opts.type, options[opts.type]);
        plot.addLayer(opts);
    });
}


function addLayerConfig (plot, type, options) {
    var cfg = plot.config.layers[type];
    if (!cfg) plot.config.layers[type] = plot.paper.config.layers[type].$child(options);
}
