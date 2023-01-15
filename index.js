const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports : ['websocket', 'polling'] 
});
const port = 5000 || process.env.PORT;

app.use(cors())
app.use(express.json())

const chatPost = require('./model');

io.on('connection', (socket) => {

    socket.on('new data', (data) => {
        // console.log('data : ' + data);

        const nama = data.nama;
        const message = data.message;
        
        const Posting = new chatPost({nama, message})
        
        Posting.save()
            .catch(err => console.log('Pesan error : ' + err))
        io.emit('new data', data);
    });
});

io.on('connection', (socket) => {
    socket.on('get data', () => {
      chatPost.find({}, (err, data) => {
        if (err) throw err;
  
        socket.emit('get data', data);
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