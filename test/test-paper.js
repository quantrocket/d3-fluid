import './utils';
import {isArray, isObject} from 'd3-let';
import {fluidPaper} from '../index';


describe('fluidPaper', () => {

    it('test fluidPaper function', () => {
        expect(isArray(fluidPaper.live)).toBe(true);
        expect(isObject(fluidPaper.constants)).toBe(true);
    });

    it('test fluidPaper responsive', () => {
        expect(fluidPaper.constants.resizeDelay).toBe(200);
    });
});
