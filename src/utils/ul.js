import {viewElement} from 'd3-view';

const tpl = `<ul class="d3-list">
<li d3-for="entry in data">
</li>
</ul>`;


export default function () {
    return viewElement(tpl);
}
