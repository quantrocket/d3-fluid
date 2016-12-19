import {map} from 'd3-collection';
import {dispatch} from 'd3-dispatch';
import {viewUid, viewProviders, viewWarn as warn} from 'd3-view';
import {assign, isString} from 'd3-let';

import layers from './layer';
import scales from './scale';
import translate from '../utils/translate';

var plotCount = 0;
var plotEvents = dispatch('init', 'before-draw', 'after-draw');


var plotProto = {
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

    // Return a group element for a plot layer
    group (layer, tag) {
        var sheet = this.paper.sheet(layer),
            group = sheet.sel().selectAll('#' + layer.uid).data([layer]);

        return group
            .enter()
                .append(tag || 'g')
                .attr('id', layer.uid)
            .merge(group)
                .attr('transform', translate(this.margin.left, this.margin.top));
    },

    // Draw a plot on a paper
    draw () {
        var plot = this,
            serie;

        this.layers.forEach((layer) => {
            serie = plot.dataStore.serie(plot.config.dataSource);
            if (layer.visible && layer.canDraw(serie)) {
                layers.events.call('before-draw', layer, serie);
                viewProviders.logger.info(`Drawing ${layer.type} layer from series ${serie.name}`);
                layer.draw(serie);
                layers.events.call('after-draw', layer, serie);
            }
        });
    },

    mapper (mapping, scale, def) {
        var plotScale;
        if (scale) {
            plotScale = this.scales.get(scale);
            if (!plotScale) warn(`plot scale "${scale}" not available`);
        }
        return function (d) {
            var value = d[mapping];
            if (value === undefined) value = def;
            if (plotScale) value = plotScale.apply(value);
            return value;
        };
    },

    translate (x, y) {
        return function (d) {
            var xt = x(d) || 0,
                yt = y(d) || 0;
            return `translate(${xt}, ${yt})`;
        };
    },

    destroy () {

    }
};


//
// Plot factory object
export default assign(map(), {
    events: plotEvents,
    proto: plotProto,
    //
    // add a new plot class to the factory
    add (type, plot) {

        function Plot (paper, options) {
            initPlot(this, type, paper, options);
        }

        Plot.prototype = assign({}, this.proto, plot);

        this.set(type, Plot);
    }
});


// A Plot is the combination is a visualisation on a paper
export function initPlot (plot, type, paper, options) {
    var protoLayers = plot.layers,
        plotLayers = [],
        scales = map(),
        config = paper.config.$child({layers: {}}),
        name = options.name;

    ++plotCount;

    if (!name) name = 'plot' + plotCount;

    Object.defineProperties(viewUid(plot), {
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
