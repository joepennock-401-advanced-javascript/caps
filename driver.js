'use strict';

/*
* Driver module - represents the "driver" that picks up, delivers, and confirms delivery of vendor orders
* Monitor the system for events. On 'pickup' event:
  * Wait 1 second
    * Log “DRIVER: picked up [ORDER_ID]” to the console
    * Emit an ‘in-transit’ event with the payload you received
  * Wait 3 seconds
    * Log “delivered” to the console
    * Emit a ‘delivered’ event with the same payload
*/

/** Require 3rd party dependencies */
const chalk = require('chalk');

/** global event pool */ 
const events = require('./events.js');

/** listen for events */
events.on('pickup', handlePickup);

/**
 * Main function that handles the 'Driver' module. Responds to incoming events from 'Vendor' and emits proper events in response.
 * @param {*} payload the origninal order info emitted from the 'Vendor' module.
 */
function handlePickup(payload){

  setTimeout( () => {
    console.log(
      chalk.inverse.greenBright('DRIVER:'), 
      `picked up order # ${payload.orderID}`
    );
    events.emit('in-transit', payload);
  }, 1000);

  setTimeout( () => {
    console.log(
      chalk.inverse.greenBright('DRIVER:'), 
      `delivered up order # ${payload.orderID}`
    );
    events.emit('delivered', payload);
  }, 3000);
  
};
