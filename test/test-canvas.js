import './utils';
import {fluidPaper} from '../index';


describe('fluidPaper', () => {

    it('test initialisation', () => {
        var paper = fluidPaper();
        expect(paper.type).toBe('canvas');
        expect(paper.uid).toBeTruthy();
        expect(paper.element).toBeTruthy();
        expect(paper.container).toBeTruthy();
        expect(paper.size).toBeTruthy();
        expect(paper.size[0]).toBeTruthy(400);
        expect(paper.size[1]).toBeTruthy(300);
        expect(paper.sheets.length).toBe(0);
    });
});
