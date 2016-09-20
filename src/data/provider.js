import cf from 'crossfilter/crossfilter';


// Provider interface
export default {

    init () {
        this._cf = cf.crossfilter();
    },

    get () {

    },

    getList () {

    },

    add (data) {
        this._cf.add(data);
        return data;
    }
};
