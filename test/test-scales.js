import {fluidScales} from '../index';


describe('fluidScales', () => {

    it('linear.x', () => {
        var Scale = fluidScales.get('x');
        var x=  new Scale();
        expect(x.type).toBe('x');
    });

});
