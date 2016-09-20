import layer from './layer';


export default function paper (options) {
    return new Paper(options);
}


function Paper (options) {
    if (!options) options = {};

    var type = options.type || 'canvas',
        layers = [];

    Object.defineProperties(layer, {
        layers: {
            get () {
                return layers;
            }
        },
        type: {
            get () {
                return type;
            }
        }
    });
}


Paper.prototype = paper.prototype = {



};


