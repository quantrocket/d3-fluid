import {map} from 'd3-collection';
import {assign, isPromise, isArray} from 'd3-let';
import {viewWarn} from 'd3-view';

import defaultProvider from './provider';


function dataStore (vm) {
    var store = new DataStore(vm);
    return store;
}


function DataStore (vm) {
    this.$providers = map();
    this.$vm = vm;
}


DataStore.prototype = dataStore.prototype = {

    size () {
        return this.$providers.size();
    },

    // set or get a new data provider
    provider (name, provider) {
        if (arguments.length === 1) return this.$providers.get(name);
        if (provider === null) {
            var p = this.$providers.get(name);
            this.$providers.remove(name);
            return p;
        }
        provider = assign({}, defaultProvider, provider);
        provider.init();
        this.$providers.set(name, provider);
        return this;
    },

    getList (name, params) {
        var provider = this.$providers.get(name) || defaultProvider,
            result = provider.getList(params);

        if (!isPromise(result)) result = new Promise((resolve) => {resolve(result);});
        return result.then((data) => {
            if (!isArray(data)) {
                viewWarn(`Excepted an array, got ${typeof data}`);
                data = [];
            }
            provider.add(data);
            return data;
        });
    }
};


export default dataStore;
