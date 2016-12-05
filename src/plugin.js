import list from './components/list';
import fluid from './components/fluid';


export default {

    install (vm) {
        vm.addComponent('d3list', list);
        vm.addComponent('d3fluid', fluid);
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
