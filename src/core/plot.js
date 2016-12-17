import {map} from 'd3-collection';
import {dispatch} from 'd3-dispatch';
import {assign, isString} from 'd3-let';


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
    var layers = [],
        scales = map(),
        name = options.name;

    ++plotCount;

    if (!name) name = 'plot' + plotCount;

    Object.defineProperties(plot, {
        type: {
            get () {
                return type;
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
