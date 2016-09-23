import dataStore from './data';
import list from './list';


export default {

    install (vm) {
        vm.model.$dataStore = dataStore(vm);
        vm.addComponent('d3list', list);
        //
        // Add dataProvider method to the view model
        vm.dataSerie = dataSerie;
    }
};



function dataSerie (name, serie) {
    if (arguments.length === 1) return this.model.$dataStore.serie(name);
    else {
        this.model.$dataStore.serie(name, serie);
        return this;
    }
}
