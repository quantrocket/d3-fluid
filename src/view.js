import {isFunction} from 'd3-let';
import {map} from 'd3-collection';
import crossfilter from 'crossfilter/crossfilter';

const dkey = 'default';

export default function (vm) {
    if (!isFunction(vm.model.$fluidData))
        vm.model.$fluidData = new FluidData(vm);
}

// add an entry to the view data handler
function FluidData (vm) {

    this.map = map();
    this.map.set(dkey, crossfilter());
    this.vm = vm;
}


FluidData.prototype = {

    add (entry, key) {
        var cf = this.map.get(key || dkey);
        if (cf) cf.add(entry);
        return this;
    }

};
