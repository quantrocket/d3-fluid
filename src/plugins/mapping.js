import {assign} from 'd3-let';
import paper from '../core/paper';


paper.events.on('init.mapping', setMapping);

const defaultMapping = {
    x: mapping('x'),
    y: mapping('y'),
    theta: mapping('theta'),
    radius: mapping('radius')
};


function setMapping (options) {
    var mapping = assign({}, defaultMapping, options.mapping);

    Object.defineProperty(this, 'mapping', {
        get () {
            return mapping;
        }
    });
}


function mapping(aesthetic) {

    return function (data) {
        
    }
}
