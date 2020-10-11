'use strict';

/* 
* Main hub for all events. 
* Manages the state of every package (ready for pickup, in transit, delivered, etc)
* Logs every event to the console with a timestamp and the event payload
*/

/** Require 3rd party dependencies */
const chalk = require('chalk');

//** Global event pool */
const events = require('./events.js');

// "external clients" - will eventually be completely separate modules/repos
require('./vendor.js');
require('./driver.js');

// pickup
events.on('pickup', (payload) => {
  logger('pickup', payload);
});

// in transit
events.on('in-transit', (payload) => {
  logger('in-transit', payload);
});

// delivered
events.on('delivered', (payload) => {
  logger('delivered', payload);
});

/**
 * Utility function to handle loggin all incoming events. Returns a formatted object with a timestamp and all relevant event info.
 * @param {*} event the name of the event being logged.
 * @param {*} payload the body of the event being logged.
 */
function logger(event, payload){

  let date = new Date().toISOString();

  console.log(
    chalk.inverse.blueBright('EVENT'), {
      event, 
      date, 
      payload
    });

};