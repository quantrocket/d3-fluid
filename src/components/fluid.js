import {viewProviders, viewRequire, viewWarn, viewElement} from 'd3-view';
import {assign, pop} from 'd3-let';
import {select} from 'd3-canvas-transition';
import {map} from 'd3-collection';
import {timeout} from 'd3-timer';

import fluidStore from '../data/index';
import paper from '../core/paper';


const responseHandlers = {
    'application/json': (vm, response) => {
        return response.json().then((data) => {
            return vm.build(data);
        });
    }
};


function fetchBuild (vm, src, attr) {
    var fetch = viewProviders.fetch;

    if (src.substring(src.length-3) === '.js') {
        return viewRequire([src]).then((data) => {
            vm.build(data, attr);
        });
    }
    else {
        return fetch(src, {method: 'GET'}).then((response) => {
            if (response.status === 200) {
                var ct = response.headers.get('content-type'),
                    handler = responseHandlers[ct];

                if (handler)
                    return handler(vm, response);
                else
                    viewWarn(`No handler for ${ct}`);
            }
            else
                viewWarn(`Could not load form from ${src}: status ${response.status}`);
        });
    }
}


export default {
    model: {

    },

    render (data, attr) {
        var src = attr.src;
        if (src) return fetchBuild(this, src, attr);
    },

    build (config) {
        var store = fluidStore(this);
        config = assign({}, config);
        if (config.data) {
            store.add(pop(config, 'data'));
        }
        var dashboard = pop(config, 'dashboard');
        if (!dashboard) {
            dashboard = {
                "paper": "paper"
            };
            config = {
                paper: config
            };
        }
        var board = new Dashboard(dashboard, config);
        timeout(() => {
            board.papers.each((paper) => {
                paper.draw();
            });
        });
        return board.container;
    }
};


function Dashboard(layout, config) {
    this.container = viewElement('<div class="container-fluid"></div>');
    this.papers = map();

    var container = select(this.container),
        papers = this.papers;

    if (!layout.rows) layout = {rows: [layout]};
    var rows = container
        .selectAll('.rows')
        .data(layout.rows)
        .enter()
        .append('div')
        .classed('row', true);

    rows
        .selectAll('.col')
        .data(function () {
            var row = select(this).datum();
            var columns = row.columns;
            if (!columns) columns = [row, papers];
            return columns;
        })
        .enter()
        .append(function (col) {
            var el = select(viewElement('<div class="col"></div>'));
            if (col.class)
                el.classed(col.class, true);
            if (col.html)
                el.html(col.html);
            if (col.aspect)
                el.attr('data-aspect-ratio', col.aspect);
            if (col.paper) {
                papers.set(col.paper, paper(el, config[col.paper]));
            }
            return el.node();
        });
}
