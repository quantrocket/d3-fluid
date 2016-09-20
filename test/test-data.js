import {dataStore} from '../';


describe('dataStore', () => {

    it('test simple', () => {
        var store = dataStore();
        expect(store.size()).toBe(1);
    });

});
