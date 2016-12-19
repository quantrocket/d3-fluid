import {map} from 'd3-collection';
import {dispatch} from 'd3-dispatch';
import {assign} from 'd3-let';
import {viewUid} from 'd3-view';


var layerEvents = dispatch('init', 'before-draw', 'after-draw');


const layerProto = {

    canDraw (serie) {
        return serie ? true : false;
    },

    // must be implemented by layers
    draw () {}
};


export default assign(map(), {
    events: layerEvents,

    add (type, layer) {

        function Layer (plot, options) {
            initLayer(this, type, plot, options);
        }

        Layer.prototype = assign({}, layerProto, layer);

        this.set(type, Layer);
        return this.get(type);
    }
});


// A Plot is the combination is a visualisation on a paper
export function initLayer (layer, type, plot, options) {
    var visible = true,
        config = plot.config.layers[type].$child(options);

    Object.defineProperties(viewUid(layer), {
        type: {
            get () {
                return type;
            }
        },
        plot: {
            get () {
                return plot;
            }
        },
        config: {
            get () {
                return config;
            }
        },
        visible: {
            get () {
                return visible;
            },
            set (value) {
                if (value !== visible) {
                    visible = value;
                }
            }
        }
    });

    layerEvents.call('init', layer, options);
}
