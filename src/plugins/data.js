import paper from '../core/paper';
import plots from '../core/plot';
import fluidStore from '../data/index';


paper.events.on('init.data', function (options) {
    var source = options.dataSource || 'default';
    this.config.$set('dataSource', source);
    this.dataStore = fluidStore(options.dataStore);
    if (options.data) this.dataStore.add(options.data);
});

plots.events.on('init.data', function (options) {
    if (options.dataSource) this.config.$set('dataSource', source);
    Object.defineProperties(this, {
        dataStore: {
            get () {
                return this.paper.dataStore;
            }
        }
    });
});
