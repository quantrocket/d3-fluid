import dataStore from './data';
import list from './list';


export default {

    install (vm) {
        vm.model.$dataStore = dataStore(vm);
        vm.addComponent('d3list', list);
    }
};
