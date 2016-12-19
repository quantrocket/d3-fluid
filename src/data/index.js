import {DataStore} from './store';
import providers from './providers';
import arrayDataProvider from './providers/array';
import remoteDataProvider from './providers/remote';
import expressionDataProvider from './providers/expression';
import random from '../utils/random';
import randomPath from '../utils/randompath';


// Create a new fluidStore
// If the view-model is given, check if a store is already available
function fluidStore (model) {
    if (model instanceof DataStore)
        return model;
    var store, vm;
    if (model && model.isd3) {
        vm = model.root;
        model = vm.model;
        store = vm._fluidStore;
        if (store) return store;
    }
    store = new DataStore(model);
    if (vm) vm._fluidStore = store;
    return store;
}

fluidStore.prototype = DataStore.prototype;
fluidStore.providers = providers;
fluidStore.events = providers.events;
fluidStore.random = random;
fluidStore.randomPath = randomPath;

export default fluidStore;


providers.add('array', arrayDataProvider);
providers.add('remote', remoteDataProvider);
providers.add('expression', expressionDataProvider);
