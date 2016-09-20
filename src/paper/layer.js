import {assign} from 'd3-let';


export default function (paper) {
    if (paper.type === 'svg') return new SvgLayer(paper);
    else return new CanvasLayer(paper);
}

function SvgLayer (paper) {
    initLayer(this, paper);
}

function CanvasLayer (paper) {
    initLayer(this, paper);
}

function initLayer (layer, paper) {

    Object.defineProperties(layer, {
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


SvgLayer.proptotype = {

};


CanvasLayer.prototype = assign({}, SvgLayer.proptotype, {

});
