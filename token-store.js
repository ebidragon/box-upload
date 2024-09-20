'use strict';

const fs = require('fs');

function TokenStore(userID) {
  this.userID = userID;
}

TokenStore.prototype = {
  read: function(callback) {
    try {
      if (typeof this.userID === 'undefined') {
        throw new Error('userID is undefined');
      }
      const tokenInfo = fs.readFileSync(__dirname + '/token/' + this.userID + '.json');
      callback(null, JSON.parse(tokenInfo));
    } catch(e) {
      e.message += ' (TokenStore.read Error)';
      callback(e);
    }
  },
  write: function(tokenInfo, callback) {
    try {
      if (typeof this.userID === 'undefined') {
        throw new Error('userID is undefined');
      }
      fs.writeFileSync(__dirname + '/token/' + this.userID + '.json', JSON.stringify(tokenInfo, null, 2));
      callback();
    } catch(e) {
      e.message += ' (TokenStore.write Error)';
      callback(e);
    }
  },
  clear: function(callback) {
    try {
      if (typeof this.userID === 'undefined') {
        throw new Error('userID is undefined');
      }
      fs.unlinkSync(__dirname + '/token/' + this.userID + '.json');
      callback();
    } catch(e) {
      e.message += ' (TokenStore.clear Error)';
      callback(e);
    }
  }
};

module.exports = TokenStore;
