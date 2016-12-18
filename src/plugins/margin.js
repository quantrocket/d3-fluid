//
//  Add margin models to Paper and Plot objects
//
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

    if (margin !== undefined && !isObject(margin)) {
        var value = margin || 0;
        margin = {
            left: value,
            right: value,
            top: value,
            bottom: value
        };
    } else {
        margin = assign({}, defaultMargin, margin);
    }
    this.margin = this.config.$new(margin);
}


function plotMargin (options) {
    this.margin = this.paper.margin.$child(options.margin);

    Object.defineProperties(this, {
        innerWidth: {
            get () {
                return this.paper.width - this.margin.left - this.margin.right;
            }
        },
        innerHeight: {
            get () {
                return this.paper.height - this.margin.top - this.margin.bottom;
            }
        },
    });
}
