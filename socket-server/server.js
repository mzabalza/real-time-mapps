const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const kafka = require('no-kafka');

const PORT = process.env.PORT || 5010;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started in port ${PORT}`)
    const consumer = new kafka.SimpleConsumer({
        connectionString: '127.0.0.1:9092'
    })

    var dataHandler = (messageSet, topic, partition) => {
        messageSet.forEach(function (m) {
            console.log(topic, partition);
            // console.log(topic, partition, m.offset, JSON.parse(m.message.value.toString('utf8')));
            io.emit('point', JSON.parse(m.message.value.toString('utf8')));
        });
    };

    return consumer.init().then(() => {
        const v1 = consumer.subscribe('geodata_final', [0, 1], dataHandler);

    });
});