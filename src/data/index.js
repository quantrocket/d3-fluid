import crossfilter from 'crossfilter/crossfilter';
import {map} from 'd3-collection';

import providers from './providers';


const dkey = 'default';


function DataStore (vm) {
    this.$map = map();
    this.$providers = providers;
    this.$vm = vm;
    this.$map.set(dkey, crossfilter());
}


DataStore.prototype = dataStore.prototype = {

    // add an entry to the datastore
    add (entry, key) {
        var cf = this.$map.get(key || dkey);
        if (cf) cf.add(entry);
        return this;
    }

};


export default function dataStore () {
    var store = new DataStore;

    return store;
}
