var socketIo = require('socket.io');

module.exports = {
    getSocketConnection: function () {
      return this.io;  
    },
    initialize: function (server) {
        
    }
}

module.exports = function (server) {
    
    this.io = null;

    this.methods = {
        emit: (evt, data) => {
            this.io.emit(evt, data);
        }
    };

    if(server && !this.io){
        this.io = socketIo(server);
        this.io.on('connection', function(socket) {
            console.log("a client have connected!");
        });
        return this.methods
    }else{
        return this.methods
    }
}