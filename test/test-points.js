import {removePaper} from './utils';
import {fluidPaper, fluidStore} from '../index';


describe('fluidPaper', () => {

    it('points plot', () => {
        var paper = fluidPaper({
            margin: 30,
            data: fluidStore.randomPath(50),
            plots: ['scatter']
        });

        expect(paper.margin.right).toBe(30);
        removePaper(paper);
    });
});
