import {viewProviders, viewWarn} from 'd3-view';


function fetchBuild (vm, src, attr) {
    var fetch = viewProviders.fetch;
    return fetch(src, {method: 'GET'}).then((response) => {
        if (response.status === 200)
            return response.json().then((data) => {
                vm.build(data, attr);
            });
        else
            viewWarn(`Could not load form from ${src}: status ${response.status}`);
    });
}


export default {

    render (data, attr) {
        var src = data.src;
        if (src) return fetchBuild(this, src, attr);
    },

    build (data, attr) {
        return attr;
    }
};
