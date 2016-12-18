import {removePaper} from './utils';
import {isArray, isObject} from 'd3-let';
import {fluidPaper, fluidLayers, fluidPlots} from '../index';


describe('fluidPaper', () => {

    it('test fluidPaper function', () => {
        expect(isArray(fluidPaper.live)).toBe(true);
        expect(isObject(fluidPaper.constants)).toBe(true);
    });

    it('test fluidPaper responsive defaults', () => {
        expect(fluidPaper.constants.resizeDelay).toBe(200);
    });

    it('test paper constructor', () => {
        var paper = fluidPaper();
        expect(paper.element).toBeTruthy();
        expect(paper.container).toBeTruthy();
        expect(paper.type).toBe('canvas');
        expect(paper.config).toBeTruthy();
        expect(paper.margin).toBeTruthy();
        expect(paper.margin.right).toBe(20);
        expect(paper.margin.left).toBe(20);
        expect(paper.margin.top).toBe(20);
        expect(paper.margin.bottom).toBe(20);
        removePaper(paper);
    });

    it('test layers container', () => {
        expect(fluidLayers.size()).toBe(3);
    });

    it('test plots container', () => {
        expect(fluidPlots.size()).toBe(4);
    });
});
