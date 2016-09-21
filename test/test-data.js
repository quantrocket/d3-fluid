import './utils';
import {dataStore} from '../';


describe('dataStore', () => {


    it('test registration', () => {
        var store = dataStore();
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


    it('test simple serie', async (done) => {
        var store = dataStore();
        expect(store.serie('foo', {
            getList () {
                return [3, 4, 3, 6];
            }
        })).toBe(store);
        expect(store.size()).toBe(1);
        //
        var data = await store.getList('foo');
        expect(data).toEqual([3, 4, 3, 6]);
        //
        data = store.serie('foo');
        expect(data.size()).toBe(4);
        done();
    });

});
