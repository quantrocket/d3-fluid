import {map} from 'd3-collection';
import {assign} from 'd3-let';


const layerProto = {

    defaults () {
        return {};
    },

    canDraw (plot, sheet, series) {
        if (!series || this.broadcast('draw', series).defaultPrevented) return;
        this.logger.info(`Drawing ${this.name} from series ${series.toString()}`);
        var current = this.$scope.$currentSeries;
        this.$scope.$currentSeries = series;
        return current || true;
    },

    draw () {}
};


export default assign(map(), {

    add (name, layer) {

        function Layer (options) {
            this.name = name;
            this.aesthetics = assign(this.defaults(), options);
        }

        Layer.prototype = assign({}, layerProto, layer);

        this.set(name, Layer);
        return this.get(name);
    },

    create (name, options) {
        var Layer = this.get(name);
        if (Layer)
            return new Layer(options);
    }
});
