import {map} from 'd3-collection';
import {assign} from 'd3-let';


export default {

    registry: map(),

    register (provider) {
        this.registry.set(assign({}, provider));
    }

};
