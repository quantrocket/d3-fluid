import {map} from 'd3-collection';
import {assign} from 'd3-let';


var dataCount = 0;


const providerProto = {

    init () {

    },

    dataName () {
        var def = this.store.serie('default');
        if (!def) return 'default';
        return 'serie' + (++dataCount);
    }
};

// Data providers container
export default assign(map(), {

    add (name, provider) {

        function Provider (providers) {
            initProvider(this, name, providers);
        }

        Provider.prototype = assign({}, providerProto, provider);

        this.set(name, Provider);
    },

    // Create a provider for a dataStore
    create (store, config) {
        var providers = this.values(),
            serie;
        for (var i=0; i<providers.length; ++i) {
            serie = new providers[i](store).init(config);
            if (serie) return serie;
        }
    }
});


function initProvider(provider, type, store) {

    Object.defineProperties(provider, {
        type: {
            get () {
                return type;
            }
        },
        store: {
            get () {
                return store;
            }
        }
    });

}
