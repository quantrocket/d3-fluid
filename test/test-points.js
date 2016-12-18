import {removePaper} from './utils';
import {fluidPaper, fluidStore} from '../index';


describe('fluidPaper', () => {

    it('scatter plot', () => {
        var paper = fluidPaper({
            margin: 30,
            data: fluidStore.randomPath(50),
            plots: ['scatter']
        });

        expect(paper.margin.right).toBe(30);
        expect(paper.plots.length).toBe(1);

        var plot = paper.plots[0];
        expect(plot.name).toBeTruthy();
        expect(plot.type).toBe('scatter');
        expect(plot.margin).toBeTruthy();
        expect(plot.paper).toBe(paper);
        expect(plot.layers.length).toBe(1);
        expect(plot.layers[0].type).toBe('points');

        paper.draw();

        removePaper(paper);
    });
});
