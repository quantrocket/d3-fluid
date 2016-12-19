import {assign} from 'd3-let';

import paper from '../core/paper';
import plots from '../core/plot';


paper.events.on('init.transitions', function (options) {
    this.config.transitions = this.config.$new(options.transitions);
});

plots.events.on('init.transitions', function (options) {
    this.config.transitions = this.paper.config.transitions.$child(options.transitions);
});


assign(plots.proto, {

    transition (layer, name) {
        var t = this.config.transitions[name];
        return t;
    }
});
