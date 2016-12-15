import {assign} from 'd3-let';


export default function (parent, initials) {
    function Child () {
        assign(this, initials);
    }
    Child.prototype = parent;
    return new Child();
}
