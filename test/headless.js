global.window = global;
global.assert = require('chai').assert;
require('../src/js/index.js');
require('./social-network.spec.js');