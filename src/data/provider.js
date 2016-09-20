import cf from 'crossfilter/crossfilter';


// Provider interface
export default {

    init () {
        this._cf = cf.crossfilter();
    },

    size () {
        return this._cf.size();
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
