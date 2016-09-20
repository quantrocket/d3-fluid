import dataStore from './data';
import list from './list';


export default {

    install (vm) {
        vm.model.$dataStore = dataStore(vm);
        vm.addComponent('d3list', list);
        //
        // Add dataProvider method to the view model
        vm.dataProvider = dataProvider;
    }
};



function dataProvider (name, provider) {
    if (arguments.length === 1) return this.model.$dataStore.provider(name);
    else {
        this.model.$dataStore.provider(name, provider);
        return this;
    }
}
