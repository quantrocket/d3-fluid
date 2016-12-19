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
        expect(store.model.randomPath).toBe(fluidStore.randomPath);
        expect(store.size()).toBe(0);

        // add provider to store
        var serie = store.add('randomPath(300)');
        expect(serie.name).toBe('default');
        expect(serie.type).toBe('expression');
        expect(store.serie('default')).toBe(serie);
        //
        // get the provider data
        expect(serie.cf).toBeTruthy();
        expect(serie.size()).toBe(300);
    });

    it('test array provider', () => {
        var store = fluidStore(),
            data = fluidStore.randomPath(20),
            serie = store.add(data);
        expect(serie).toBeTruthy();
        expect(store.size()).toBe(1);
        expect(serie.size()).toBe(20);
        expect(serie.name).toBeTruthy();
    });
});
