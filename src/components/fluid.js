import {viewProviders, viewRequire, viewWarn, viewElement} from 'd3-view';
import {assign, pop} from 'd3-let';
import {select} from 'd3-canvas-transition';
import fluidStore from '../data/index';


function fetchBuild (vm, src, attr) {
    var fetch = viewProviders.fetch;

    if (src.substring(src.length-3) === '.js') {
        return viewRequire([src]).then((data) => {
            vm.build(data, attr);
        });
    }
    else {
        return fetch(src, {method: 'GET'}).then((response) => {
            if (response.status === 200)
                return response.json().then((data) => {
                    vm.build(data, attr);
                });
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
        return createDashboard(dashboard, config);
    }
};


function createDashboard(layout, papers) {
    var container = select(viewElement('<div class="container-fluid"></div>'));
    if (!layout.rows) layout = {rows: [layout]};
    var rows = container
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
        .append('div')
        .classed('col', true);

    return container;
}
