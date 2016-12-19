import list from './components/list';
import fluid from './components/fluid';


export default {

    install (vm) {
        vm.addComponent('d3list', list);
        vm.addComponent('d3fluid', fluid);
    }
};
