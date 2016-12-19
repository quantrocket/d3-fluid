import {removePaper} from './utils';
import {fluidPaper, fluidStore} from '../index';


describe('fluidPaper', () => {

    it('scatter plot - canvas', () => {
        testPoint('canvas');
    });

    //it('scatter plot - svg', () => {
    //    testPoint('svg');
    //});
});


function testPoint (type) {
    var paper = fluidPaper({
        margin: 30,
        type: type,
        data: fluidStore.randomPath(50),
        plots: ['scatter']
    });

    expect(paper.margin.right).toBe(30);
    expect(paper.plots.length).toBe(1);
    expect(paper.config.dataSource).toBe('default');

    var plot = paper.plots[0];
    expect(plot.name).toBeTruthy();
    expect(plot.type).toBe('scatter');
    expect(plot.margin).toBeTruthy();
    expect(plot.paper).toBe(paper);
    expect(plot.config.dataSource).toBe('default');
    expect(plot.layers.length).toBe(1);
    expect(plot.layers[0].type).toBe('points');

    paper.draw();

    removePaper(paper);
}
