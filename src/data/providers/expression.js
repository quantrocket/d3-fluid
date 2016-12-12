import {isString, isObject} from 'd3-let';
import {viewExpression} from 'd3-view';


export default {

    init (config) {
        var opts;
        if (isString(config))
            opts = {expression: config};
        else if (isObject(config) && config.type === 'expression')
            opts = config;
        if (opts) {
            this.name = opts.name || this.dataName();
            this.expression = viewExpression(opts.expression);
            return this;
        }
    },

    data () {
        var model = this.store.model;
        return this.expression.eval(model);
    }
};
