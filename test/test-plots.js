import {isFunction, isObject} from 'd3-let';
import {fluidPlots} from '../index';


describe('fluidPlots', () => {

    it('properties', () => {
        expect(isObject(fluidPlots.proto)).toBe(true);
        expect(isFunction(fluidPlots.proto.transition)).toBe(true);
    });

});
