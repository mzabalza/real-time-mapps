const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const kafka = require('no-kafka');

const PORT = process.env.PORT || 5010;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// io.on('connect', (socket) => {
//     console.log(`New player connected: ${socket.id}`);
//     socket.on('join', ({ room }) => {
//         // socket.join - joins a player to a room
//         socket.join(room);
//         io.to(room).emit('point', {
//             "busline": "00001",
//             "key": "00001_6c17d76e-e5e4-4efd-845e-98a1776f75f0",
//             "timestamp": "2020-12-09 10:28:35.578140",
//             "latitude": 51.506979544573035,
//             "longitude": -0.10814666748046874
//         });
//     });


//     // 'sendMessage' - USER GENERATED MESSAGES
//     socket.on('message', ({ message }) => {

//         console.log(message);

//     });



//     socket.on('disconnect', () => {
//         console.log(`Socket ${socket.id} disconnected.`);

//     });
// })

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started in port ${PORT}`)
    const consumer = new kafka.SimpleConsumer({
        connectionString: '127.0.0.1:9092'
    })

    var dataHandler = (messageSet, topic, partition) => {
        messageSet.forEach(function (m) {
            console.log(topic, partition, m.offset, JSON.parse(m.message.value.toString('utf8')));
            io.emit('point', JSON.parse(m.message.value.toString('utf8')));
        });
    };

    return consumer.init().then(() => {
        const v1 = consumer.subscribe('geodata_final', [0, 1], dataHandler);

    });
});