import {map} from 'd3-collection';
import {assign} from 'd3-let';


export default assign(map(), {

    add (name, layers) {
        this.set(name, layers);
    }
});



// A Plot is a drawing on a paper sheet, on the other hand a Plot is made up
// of one or more layers.
export function Plot () {
    var layers = [];

    Object.defineProperties(this, {
        layers: {
            get () {
                return layers;
            }
        }
    });
}


Plot.prototype = {

    draw (sheet) {
        var plot = this,
            series = this.getSeries();

        this.layers.forEach(() => {
            if (this.canDraw(plot, sheet, series))
                this.draw(plot, sheet, series);
        });
    }
};


