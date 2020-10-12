'use strict';

/*
- Connect to socket
- Create namespace
- Create room for each vendor
- Listen for all events from vendor and driver
- Create logger function to track all events
*/

require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

io.on('connect', socket => {
  // socket.on('pickup', payload => {
  //   logger('pickup', payload);
  // });
  // socket.on('in-transit', payload => {
  //   logger('in-transit', payload);
  // });
  // socket.on('delivered', payload => {
  //   logger('delivered', payload);
  // });
});

const capsNamespace = io.of('/caps-namespace');

capsNamespace.on('connect', socket => {

  // creates a new room
  socket.on('join', room => {
    console.log('Welcome to Joe\'s emporium of wacky goods!', room);
    socket.join(room);
  });

  socket.on('pickup', payload => {
    logger('pickup', payload);
    capsNamespace.emit('pickup', payload);
  });
  socket.on('in-transit', payload => {
    logger('in-transit', payload);
    capsNamespace.emit('in-transit', payload);
  });
  socket.on('delivered', payload => {
    logger('delivered', payload);
    capsNamespace.to(payload.store)
      .emit('delivered', payload);
  });

});

function logger(event, payload){
  let date = new Date().toISOString();
  console.log('EVENT', { event, date, payload });
};

function daveefy(socket, next){
  console.log('daveefy got called');
  
};