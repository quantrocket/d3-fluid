import {map} from 'd3-collection';
import {isPromise, isArray} from 'd3-let';
import {viewWarn as warn} from 'd3-view';

import providers from './providers';


export function DataStore (model) {
    var series = map();

    Object.defineProperties(this, {
        series: {
            get () {
                return series;
            }
        }
    });

    this.model = model;
}


DataStore.prototype = {

    size () {
        return this.series.size();
    },

    // Add a new serie from a provider
    add (config) {
        return providers.create(this, config);
    },

    // set, get or remove a data provider
    serie (name, serie) {
        if (arguments.length === 1) return this.series.get(name);
        if (serie === null) {
            var p = this.series.get(name);
            this.series.remove(name);
            return p;
        }
        this.series.set(name, serie);
        return this;
    },

    getList (name, params) {
        var serie = this.series.get(name),
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
