import {isArray} from 'd3-let';
import crossfilter from 'crossfilter';


export default {

    init (config) {
        if (isArray(config))
            this._data = crossfilter(config);
    },

    data () {
        return this._data;
    }
};
