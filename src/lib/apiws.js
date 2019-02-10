'use strict';

const uuidv1 = require('uuid/v1');
const uuid = uuidv1();
module.exports.uuid = uuid;
// or http://127.0.0.1:7001/chat
const socket = require('socket.io-client')('http://127.0.0.1:6001');
const callbackMap = {};
let connect = false;
socket.on('connect', () => {
  connect = true;
  console.log('connect!', uuid);
  socket.emit('loginqr', 'hello world!');
});
socket.on(uuid, msg => {
  if(callbackMap[msg.type]) {
    callbackMap[msg.type]();
  }
  console.log('uuid from server: %s!', msg);
});
socket.on('res', msg => {
  console.log('res from server: %s!', msg);
});

module.exports = (opts, callback) => {
  if (connect) {
    callbackMap[type] = callback;
    socket.emit(opts.url, opts.uuid);
  }
  
}
module.exports.regAction = (type, callback) => {
  callbackMap[type] = callback;
};
module.exports.unregAction = (type) => {
  delete callbackMap[type];
};