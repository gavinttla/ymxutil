/**
 * SocketController
 *
 * @description :: Server-side logic for managing sockets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require("bluebird");

// the number is second
function msgAfterTimeout (number) {
  return new Promise((resolve, reject) => {
      console.log("current running:"+number)
      setTimeout(() => resolve(number+1), 1000)
  })
}

var whilepromise = function(opromise) {
  opromise.then(fun)
}

module.exports = {
	
  /**
   * `SocketController.list()`
   */
  list: function (req, res) {

    var num = req.body.number

    var i=0, p
    while(i<num){
      p = msgAfterTimeout(i)
      p.then(function(newnum){
        i = newnum
      })
    }


  },


  index: function (req, res) {

    
  }


};

