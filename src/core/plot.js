import {map} from 'd3-collection';
import {dispatch} from 'd3-dispatch';
import {assign, isString} from 'd3-let';
import {viewWarn as warn} from 'd3-view';


var plotCount = 0;
var plotEvents = dispatch('init', 'before-draw', 'after-draw');


const plotProto = {

    // get the data serie associated with this plot
    getSeries () {
    },

    // Return a group element for a plot layer
    group (paper, layer) {
        var sheet = paper.plotSheet;
        var group = sheet.selection().selectAll('.' + layer.uid).data([layer]);
        return group;
    },

    // Draw a plot on a paper
    draw (paper) {
        var plot = this,
            series = this.getSeries();

        this.layers.forEach(() => {
            if (this.canDraw(plot, paper, series))
                this.draw(plot, paper, series);
        });
    }
};


export default assign(map(), {
    events: plotEvents,

    add (name, plot) {

        function Plot (options) {
            initPlot(this, name, options);
        }

        Plot.prototype = assign({}, plotProto, plot);

        this.set(name, Plot);
    },

    init (paper, plots) {
        if (!plots) return;
        if (isString(plots)) plots = [plots];
        var factory = this;
        plots.forEach(function (options) {
            if (isString(options)) options = {type: options};
            var Plot = factory.get(options.type);
            if (!Plot) warn(`Plot type "${options.type}" not available`);
            else {
                var plot = new Plot(options);
                ++plotCount;
                if (!plot.name) plot.name = 'plot' + plotCount;
                paper.plots.push(plot);
            }
        });
    }
});


// A Plot is the combination is a visualisation on a paper
export function initPlot (plot, type, options) {
    var layers = [],
        scales = map();

    Object.defineProperties(plot, {
        type: {
            get () {
                return type;
            }
        },
        layers: {
            get () {
                return layers;
            }
        },
        scales: {
            get () {
                return scales;
            }
        }
    });

    plotEvents.call('init', plot, options);
}
