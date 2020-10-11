'use strict';

/* Global event pool to be shared by all modules. */

const Events = require('events');
const events = new Events();

module.exports = events;