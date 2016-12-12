import {assign} from 'd3-let';


export default function (paper) {
    if (paper.type === 'svg') return new Svg(paper);
    else return new Canvas(paper);
}

function Svg (paper) {
    initSheet(this, paper);
}

function Canvas (paper) {
    initSheet(this, paper);

    var c = paper.container,
        canvas = c.append('canvas').classed('d3-layer', true),
        node = canvas.node();

    var position = c.select('canvas').node() === node ? 'relative' : 'absolute';
        canvas
            .style('position', position)
            .style('top', 0)
            .style('left', 0);
}

function initSheet (sheet, paper) {

    Object.defineProperties(sheet, {
        paper: {
            get () {
                return paper;
            }
        },
        type: {
            get () {
                return paper.type;
            }
        }
    });
}


Svg.proptotype = {

    toJson () {

    },

    gradient () {

    }
};


Canvas.prototype = assign({}, Svg.proptotype, {

    gradient () {

    }
});
