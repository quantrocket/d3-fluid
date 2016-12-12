import './utils';
import {fluidStore} from '../index';
import {isArray} from 'd3-let';


describe('dataStore', () => {

    it('test registration', () => {
        var store = fluidStore();
        expect(store.size()).toBe(0);
        expect(store.serie('foo')).toBe(undefined);
        expect(store.serie('foo', {})).toBe(store);
        expect(store.size()).toBe(1);
        var foo = store.serie('foo');
        expect(foo).toBeTruthy(store);
        expect(store.serie('foo', null)).toBe(foo);
        expect(store.serie('foo')).toBe(undefined);
        expect(store.size()).toBe(0);
    });

    it('test expression provider', () => {
        var store = fluidStore({
            randomPath: fluidStore.randomPath
        });
        expect(store.model).toBeTruthy();
        expect(store.model.randomPath).toBeTruthy();
        expect(store.size()).toBe(0);

        // add provider to store
        var provider = store.add('randomPath(300)');
        expect(provider.name).toBe('default');
        expect(store.serie('default')).toBe(provider);
        //
        // get the provider data
        var data = provider.data();
        expect(isArray(data)).toBe(true);
    });
});
