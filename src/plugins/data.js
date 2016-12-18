import paper from '../core/paper';
import fluidStore from '../data/index';


paper.events.on('init.data', setData);


function setData (options) {
    this.data = fluidStore(options.data);
}
