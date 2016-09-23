// d3-view component to list data
// tags supported: table, ul & div
//
// Some ideas taken from
//  * list.js (https://github.com/javve/list.js)
//  *
import {select} from 'd3-selection';
import {viewWarn as warn} from 'd3-view';

import ul from './list';


const tags = {
    ul
};


export default {

    render (data, attrs) {
        var tag = data.tag || 'ul',
            id = attrs.id || `list-${this.uid}`,
            html = tags[tag],
            store;

        if (attrs.source) {
            store = this.model.$dataStore.serie(attrs.source);
            if (!store) warn(`source "${attrs.source}" not available, cannot retrieve serie`);
        } else
            warn('source not specified, cannot retrieve serie');

        var el = this.htmlElement(`<div id="${id}"></div>`);

        if (!html) warn(`Could not find html builder for "${tag}" tag`);
        else select(el).append(html);

        return el;
    }
};
