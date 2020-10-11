'use strict';

/*
* Vendor module - represents the "store" that is posting up deliveries.
* Declare your store name
* Every 5 seconds, simulate a new customer order:
  * Create a fake order, as an object {storeName, orderId, customerName, address}
  * Emit a ‘pickup’ event and attach the fake order as payload
* Monitor the system for events
  * Whenever the ‘delivered’ event occurs, log "Thank you" to the console
*/ 

/** Require 3rd party variables */
const chalk = require('chalk');
const faker = require('faker');

/** Global event pool */
const events = require('./events.js');

// declare store name (faker)
// generate order info

/** Function that handles the generation of a simulated vendor order. Emits an event with a new order ever 5 seconds */
setInterval( () => {
  let payload = {
    storeName: faker.company.companyName(),
    orderID: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup', payload);
}, 5000);

events.on('delivered', deliveryConfirmation);
/**
 * Function to handle the event listener for delivery confirmation.
 * @param {*} payload the inital order info generated from the 'Vendor' module.
 */
function deliveryConfirmation(payload){

  console.log(
    chalk.inverse.magentaBright('VENDOR:'), 
    `Thank you for delivering order # ${payload.orderID}`
  );

};
