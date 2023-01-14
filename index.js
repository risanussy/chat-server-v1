const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const port = 5000;

app.use(cors())
app.use(express.json())

const chatPost = require('./model');

io.on('connection', (socket) => {

    socket.on('data', (data) => {
        // console.log('data : ' + data);

        const nama = data.nama;
        const chat = data.message;
        
        const Posting = new chatPost({nama, chat})
        
        Posting.save()
            .catch(err => console.log('Pesan error : ' + err))
        io.emit('data', data);
    });
});

io.on('connection', (socket) => {
    socket.on('get data', () => {
      chatPost.find({}, (err, data) => {
        if (err) throw err;
  
        socket.emit('data', data);
      });
    });
});

mongoose.connect('mongodb+srv://admin:IhnbrlZkHif2i8YP@al-azhar.dgeaugp.mongodb.net/?retryWrites=true&w=majority')
  .then(()=> {
    http.listen(port, ()=>{
      console.log(`server is running...`)
    })
  })
  .catch(err => console.log(err))