import './utils';
import {fluidPaper} from '../index';
import {isObject} from 'd3-let';


describe('fluidPaper', () => {

    it('test initialisation', () => {
        var paper = fluidPaper();
        expect(paper.type).toBe('canvas');
        expect(paper.uid).toBeTruthy();
        expect(paper.element).toBeTruthy();
        expect(paper.container).toBeTruthy();
        expect(paper.size).toBeTruthy();
        expect(paper.sheets.length).toBe(0);
        expect(isObject(paper.margin)).toBe(true);
    });
});
