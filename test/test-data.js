import './utils';
import {dataStore} from '../';


describe('dataStore', () => {


    it('test registration', () => {
        var store = dataStore();
        expect(store.size()).toBe(0);
        expect(store.provider('foo')).toBe(undefined);
        expect(store.provider('foo', {})).toBe(store);
        expect(store.size()).toBe(1);
        var foo = store.provider('foo');
        expect(foo).toBeTruthy(store);
        expect(store.provider('foo', null)).toBe(foo);
        expect(store.provider('foo')).toBe(undefined);
        expect(store.size()).toBe(0);
    });


    it('test simple provider', async (done) => {
        var store = dataStore();
        expect(store.provider('foo', {
            getList () {
                return [3, 4, 3, 6];
            }
        })).toBe(store);
        expect(store.size()).toBe(1);
        var data = await store.getList('foo');
        expect(data).toEqual([3, 4, 3, 6]);
        //
        data = store.provider('foo');
        expect(data.size()).toBe(4);
        done();
    });

});
