// Title plot annotation
import {isString} from 'd3-let';
import plots from '../paper/plot';


plots.events.on('init.title', initTitle);


function initTitle (options) {
    var title = options.title || {};
    if (isString(title)) title = {text: title};
    this.title = title;
}
