import './utils';
import {fluidPaper} from '../index';


describe('fluidPaper', () => {

    it('test initialisation', () => {
        var paper = fluidPaper();
        expect(paper.type).toBe('canvas');
        expect(paper.uid).toBeTruthy();
        expect(paper.element).toBeTruthy();
        expect(paper.container).toBeTruthy();
    });
});
