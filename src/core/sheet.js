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
        },
        sel: {
            get () {
                return select(this.element);
            }
        },
    });

    // make sure the size and definition are correct
    sheet.clear();
}


Svg.prototype = {

    createElement (node) {
        return node;
    },

    clear () {
        this.sel.style('width', this.paper.width).style('height', this.paper.height);
        return this;
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

    clear () {
        var ctx = this.element.context,
            width = this.paper.width,
            height = this.paper.height,
            factor = this.element.factor;
        ctx.beginPath();
        ctx.closePath();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.canvas.width = width;
        ctx.canvas.height = height;

        if (factor != 1) {
            ctx.canvas.style.width = width + "px";
            ctx.canvas.style.height = height + "px";
            ctx.canvas.width = width * window.devicePixelRatio;
            ctx.canvas.height = height * window.devicePixelRatio;
            ctx.scale(factor, factor);
        }
        return this;
    },

    gradient () {

    }
});
