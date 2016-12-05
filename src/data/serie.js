
// Provider interface
export default {

    init (store, data) {
        this._cf = store.$cf.crossfilter();
        if (arguments.length > 1) this.add(data);
        this.natural = this._cf.dimension((d) => {
            return d._id;
        });
    },

    size () {
        return this._cf.size();
    },

    get () {

    },

    // retrieve data from
    getList () {

    },

    // add data to the serie
    add (data) {
        var size = this.size();
        data = data.map((entry) => {
            if (typeof entry === 'object') data._id = ++size;
            else data = {_id: ++size, data: data};
            return data;
        });
        this._cf.add(data);
        return data;
    }
};
