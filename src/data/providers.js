import {map} from 'd3-collection';
import {dispatch} from 'd3-dispatch';
import {isPromise, assign, pop} from 'd3-let';
import crossfilter from 'crossfilter';


var dataCount = 0;


var dataEvents = dispatch('init', 'data');


const providerProto = {

    init () {

    },

    size () {
        return this.cf.size();
    },

    load () {

    },

    data (cfg, data) {
        if (arguments.length === 2)
            return this.add(data);
        else {
            var self = this;
            data = this.load();
            if (isPromise(data))
                return data.then((d) => {
                    self.data(cfg, d);
                });
            return this.data(cfg, data);
        }
    },

    // add data to the serie
    add (data) {
        if (!data) return this;
        var size = this.size();
        data = data.map((entry) => {
            if (typeof entry === 'object') data._id = ++size;
            else data = {_id: ++size, data: data};
            return data;
        });
        this.cf.add(data);
        dataEvents.call('data', this, data);
        return this;
    }
};

// Data providers container
export default assign(map(), {
    events: dataEvents,

    add (type, provider) {

        function Provider (store, config) {
            initProvider(this, type, store, config);
        }

        Provider.prototype = assign({}, providerProto, provider);

        this.set(type, Provider);
        return Provider;
    },

    // Create a provider for a dataStore
    create (store, config) {
        var providers = this.values(),
            cfg;
        for (var i=0; i<providers.length; ++i) {
            cfg = providers[i].prototype.init(config);
            if (cfg) return new providers[i](store, cfg);
        }
    }
});


function initProvider(provider, type, store, config) {

    var name = dataName(store, pop(config, 'name')),
        cf = crossfilter();

    provider.natural = cf.dimension((d) => {
        return d._id;
    });

    Object.defineProperties(provider, {
        cf: {
            get () {
                return cf;
            }
        },
        name: {
            get () {
                return name;
            }
        },
        store: {
            get () {
                return store;
            }
        },
        type: {
            get () {
                return type;
            }
        },
        config: {
            get () {
                return config;
            }
        }
    });

    store.series.set(name, provider);

    dataEvents.call('init', provider, config);
    provider.data();
}


function dataName (store, name) {
    ++dataCount;
    if (name) return '' + name;
    var def = store.serie('default');
    if (!def) return 'default';
    return 'serie' + dataCount;
}
