
const socketIO = require('../app');
const Chat = require('../models/chatModel');


//Add this before the app.get() block
const  connectSocket = ()=>{
    socketIO.on('connection', (socket) => {
        console.log(`A user connected!`);

        socket.on('message', async (data) => {
          socketIO.emit('messageResponse', data);

          const chats = await Chat.find({course: data.course});
          
          if(chats.length==0){
            const obj = {
              course: data.course,
              chats:[],
            }
            obj.chats.push({
              name:data.name,
              text:data.text,
              user:data.userid,
            })
            const created = new Chat(obj);
            const saved = await created.save();
            //console.log("saved",saved);
          }else{
            const obj = {
                name:data.name,
                text:data.text,
                user:data.userid,
            }
            //console.log("chats", chats[0].chats);
            chats[0].chats.push(obj);
            const saved = await chats[0].save();
            //console.log("saved", saved);
          }
        })

        socket.on('disconnect', () => {
          console.log('A user disconnected');
        });
    });
}

module.exports = connectSocket