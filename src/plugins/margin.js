import {assign, isObject} from 'd3-let';
import paper from '../paper/index';


paper.events.on('init.margin', paperMargin);


const defaultMargin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
};


function paperMargin (options) {
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
