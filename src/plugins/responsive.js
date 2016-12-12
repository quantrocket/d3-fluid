import {inBrowser} from 'd3-let';
import {viewDebounce} from 'd3-view';
import {select} from 'd3-canvas-transition';

import paper from '../core/paper';


if (inBrowser) {
    if (!paper.constants.resizeDelay)
        paper.constants.resizeDelay = 200;

    var resize = viewDebounce(resizePaper, paper.constants.resizeDelay);
    select(window).on('resize.paper', resize);
}


function resizePaper () {
    paper.live.forEach(function () {
        this.resize();
    });
}
