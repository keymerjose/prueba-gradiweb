const express   = require('express');
const cors      = require('cors');

class Server {

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.app.use( cors() );
        this.app.use( express.static('public') );
        this.app.use('/get-data', require('../routes/data'));
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;