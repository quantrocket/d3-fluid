import {map} from 'd3-collection';
import {assign} from 'd3-let';


const scaleProto = {

};


// Scale factory container
export default assign(map(), {

    add (name, scale) {

        function Scale (options) {
            this.name = name;
            this.options = options;
        }

        Scale.prototype = assign({}, scaleProto, scale);

        this.set(name, Scale);
        return this.get(name);
    },

    create (name, options) {
        var Scale = this.get(name);
        if (Scale)
            return new Scale(options);
    }
});
