import {dataStore} from '../';


describe('dataStore', () => {

    it('test simple', () => {
        var store = dataStore();
        expect(store.size()).toBe(1);
        expect(store.provider('foo')).toBe(undefined);
        expect(store.provider('foo', {})).toBe(store);
    });

});
