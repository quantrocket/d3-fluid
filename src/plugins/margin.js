import {assign, isObject} from 'd3-let';
import paper from '../core/paper';
import plots from '../core/plot';


paper.events.on('init.margin', setMargin);
plots.events.on('init.margin', plotMargin);


const defaultMargin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
};


function setMargin (options) {
    var margin = options.margin;

    if (!isObject(margin)) {
        var value = margin || 0;
        margin = {
            left: value,
            right: value,
            top: value,
            bottom: value
        };
    } else {
        margin = assign({}, margin, defaultMargin);
    }

    Object.defineProperty(this, 'margin', {
        get () {
            return margin;
        }
    });
}


function plotMargin (options) {
    function Margin (initials) {
        assign(this, initials);
    }
    Margin.prototype = this.paper.margin;

    var margin = new Margin(options.margin);

    Object.defineProperty(this, 'margin', {
        get () {
            return margin;
        }
    });
}
