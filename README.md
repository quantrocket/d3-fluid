# d3-fluid
Reactive data visualization components

[![CircleCI](https://circleci.com/gh/quantmind/d3-fluid.svg?style=svg&circle-token=a224bfec44b5c4ea2457d374283302b0902418f5)](https://circleci.com/gh/quantmind/d3-fluid)

[Coverage][]

This is a [d3 plugin](https://bost.ocks.org/mike/d3-plugin/) containing
reactive data visualization components.

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installing](#installing)
  - [API Reference](#api-reference)
- [Components](#components)
- [dataStore](#datastore)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Installing

If you use [NPM](https://www.npmjs.com/package/d3-fluid), ``npm install d3-fluid``.
Otherwise, download the latest release.
AMD, CommonJS, and vanilla environments are supported. In vanilla, a d3 global is exported.
Try [d3-fluid](https://runkit.com/npm/d3-fluid) in your browser.
```
<script src="https://assets.fluidily.com/libs/d3-view/latest/d3-view.min.js"></script>
<script src="https://assets.fluidily.com/libs/d3-fluid/latest/d3-fluid.min.js"></script>
<script>

var vm = d3.view().use(d3.fluid);
vm.mount('#target');

</script>
```

### API Reference

## Components

## dataStore

The datastore object is the core of the data retrieval and manipulation:
```
var ds = d3.dataStore();
```

<a name="user-content-datastore-provider" href="#datastore-provider">#</a> dataStore.<b>provider</b>(<i>name</i>, [<i>provider</i>])

If *provider* is specified, sets a new provider for the specified *name* and return this dataStore.
If a provider was already registered for the same *name*, the existiung provider is removed. If
*provider* is *null*, removes the current provider for the specified *name*, if any.
If *provider* is not specified, returns the provider registered with *name* if any.


[Coverage]: https://circleci.com/api/v1/project/quantmind/d3-fluid/latest/artifacts/0/$CIRCLE_ARTIFACTS/coverage/index.html?branch=master&filter=successful
