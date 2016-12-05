import {map} from 'd3-collection';
import {assign, isPromise, isArray} from 'd3-let';
import {viewRequire, viewWarn as warn} from 'd3-view';

import defaultSerie from './serie';


function fluidStore (vm) {
    if (vm) {
        vm = vm.root;
        var store = vm._fluidStore;
        if (store) return store;
    }
    var promise = viewRequire(['crossfilter']).then(function (cf) {
        var store = new DataStore(cf, vm);
        return store;
    });
    if (vm) vm._fluidStore = promise;
    return promise;
}


function DataStore (cf, vm) {
    this.$cf = cf;
    this.$series = map();
    this.$vm = vm;
    if (vm) vm._fluidStore = this;
}


DataStore.prototype = fluidStore.prototype = {

    size () {
        return this.$series.size();
    },

    // set or get a new data provider
    serie (name, newSerie) {
        if (arguments.length === 1) return this.$series.get(name);
        if (newSerie === null) {
            var p = this.$series.get(name);
            this.$series.remove(name);
            return p;
        }
        var serie = assign({}, defaultSerie, newSerie);
        serie.init(this);
        this.$series.set(name, serie);
        return this;
    },

    getList (name, params) {
        var serie = this.$series.get(name),
            result = serie ? serie.getList(params) : [];

        if (!isPromise(result)) {
            result = new Promise((resolve) => {resolve(result);});
            if (!serie) {
                warn(`Serie "${name} not available`);
                return result;
            }
        }

        return result.then((data) => {
            if (!isArray(data)) {
                warn(`Excepted an array, got ${typeof data}`);
                data = [];
            }
            serie.add(data);
            return data;
        });
    }
};


export default fluidStore;
