import cf from 'crossfilter/crossfilter';
import {map} from 'd3-collection';
import {assign, isString} from 'd3-let';

import providerDefaults from './provider';

const dkey = 'default';


function dataStore (vm) {
    var store = new DataStore(vm);
    return store;
}


function DataStore (vm) {
    this.$map = map();
    this.$providers = map();
    this.$vm = vm;
    this.$map.set(dkey, cf.crossfilter());
}


DataStore.prototype = dataStore.prototype = {

    // add an entry to the datastore
    add (entry, key) {
        var cf = this.$map.get(key || dkey);
        if (cf) cf.add(entry);
        return this;
    },

    size () {
        return this.$map.size();
    },

    // set or get a new data provider
    provider (name, provider) {
        if (arguments.length === 1) return this.$providers.get(name);
        provider = assign({}, providerDefaults, provider);
        this.$providers.set(name, provider);
        return this;
    }
};


export default dataStore;
