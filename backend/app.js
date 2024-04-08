const express = require('express')
const app = express();
const http = require('http').Server(app);
require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const parentRouter = require('./routes/parentRoutes');
const teacherRouter = require('./routes/teacherRoutes');
const courseRouter = require('./routes/courseRoutes');
const messageRouter = require('./routes/messageRouter');
const blogRoutes = require('./routes/blogRoutes');
const marksRouter = require('./routes/marksRoute')
const assignmentRouter = require('./routes/assignmentRoutes');
const resourceRouter = require('./routes/resourceRoutes');
const webinarRoutes = require('./routes/webinarRoutes');
const wordRoutes = require("./routes/wordsRoutes");
const questionRoutes = require("./routes/questionRoutes");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();
const imageUploadRoute = require('./routes/imageRoute');



app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(express.json());
app.use(cookieParser());
dbConnect().then(() => {
  console.log("Connection successful");
})
  .catch(err => console.log(err));


// -----Socket IO----
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:5173"
  }
});
module.exports = socketIO;
const connectSocket = require('./utils/socketIO');
connectSocket();
//--------------------

app.use(cors());
app.use('/api/parent', parentRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/course', courseRouter);
app.use('/api/messages', messageRouter);
app.use('/api/marks', marksRouter);
app.use('/api/assignment', assignmentRouter);

app.use('/api/resources', resourceRouter);
app.use('/api/webinars', webinarRoutes);
app.use('/api/blogs', blogRoutes);

app.use('/api/word', wordRoutes);
app.use('/api/question', questionRoutes);


app.get("/", (req, res) => {
  res.send("Hello, world!");
});



app.use('/api/v1/upload', imageUploadRoute);

const PORT = 4000;
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

