import {dataStore} from '../';


describe('dataStore', () => {

    it('test simple', () => {
        var store = dataStore();
        expect(store.size()).toBe(1);
        expect(store.provider('foo')).toBe(undefined);
        expect(store.provider('foo', {})).toBe(store);
        var foo = store.provider('foo');
        expect(foo).toBeTruthy(store);
        expect(store.provider('foo', null)).toBe(foo);
        expect(store.provider('foo')).toBe(undefined);
    });

});
