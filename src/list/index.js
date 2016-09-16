import list from './component';
import dataView from '../view';


export default {

    install (view) {
        view.addComponent('d3list', list);
        dataView(view);
    }
};
