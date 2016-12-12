import {isObject} from 'd3-let';
import paper from '../core/paper';


paper.events.on('init.background', initBackground);
paper.events.on('before-draw.background', drawBackground);


function initBackground (options) {
    var background = options.background || {};

    if (!isObject(background)) background = {color: background};

    Object.defineProperty(this, 'background', {
        get () {
            return background;
        }
    });
}


function drawBackground () {
    //grad = gradient(this.background);
    //grad.xscale.range([0, paper.width]);
    //grad.yscale.range([0, paper.height]);
    //grad.draw(paper.background);
}
