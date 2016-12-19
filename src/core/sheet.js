import {selection, select} from 'd3-canvas-transition';
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
}

function initSheet (sheet, paper) {
    var c = paper.container,
        selection = c.append(paper.type).classed('d3-sheet', true),
        node = selection.node(),
        position = c.select(paper.type).node() === node ? 'relative' : 'absolute',
        element = sheet.createElement(node, paper);

    selection
        .style('position', position)
        .style('top', 0)
        .style('left', 0);

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
        },
        element: {
            get () {
                return element;
            }
        },
        node: {
            get () {
                return node;
            }
        }
    });
}


Svg.prototype = {
    createElement (node) {
        return node;
    },

    sel () {
        return select(this.element);
    },

    toJson () {

    },

    gradient () {

    }
};


Canvas.prototype = assign({}, Svg.prototype, {

    createElement (node, paper) {
        return selection(node.getContext('2d'), paper.config.factor).node();
    },

    gradient () {

    }
});
