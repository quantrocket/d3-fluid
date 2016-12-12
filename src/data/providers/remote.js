import {isString, isObject} from 'd3-let';


const schemes = ['http', 'https', 'ws', 'wss'];


export default {

    init (config) {
        var opts;
        if (isUrl(config))
            opts = {url: config};
        else if (isObject(config) && config.url)
            opts = config;
        if (opts) {
            this.name = opts.name || this.dataName();
            this.url = opts.url;
            return this;
        }
    }
};


function isUrl (value) {
    return isString(value) && schemes.indexOf(value.split('://')[0]) > -1;
}
