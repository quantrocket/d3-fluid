import {isFunction} from 'd3-let';
import {view, viewElement} from 'd3-view';

import {fluidPlugin, fluidStore} from '../index';


describe('fluidPlugin', () => {

    it('plugin', () => {
        expect(isFunction(fluidPlugin.install)).toBe(true);
    });

    it('d3fluid', () => {
        var vm = view({
            model: {
                d3: {
                    fluidStore: fluidStore
                },
                test: {
                    data: "d3.fluidStore.randomPath(300)",
                    paper: {
                        type: "svg",
                        plot: "scatter"
                    }
                }
            }
        }).use(fluidPlugin);
        expect(vm.components.get('d3fluid')).toBeTruthy();

        vm.mount(viewElement('<div><d3fluid src="test"></d3fluid></div>'));
    });

});
