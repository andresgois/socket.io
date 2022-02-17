import "reflect-metadata";
import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose, { ConnectOptions } from "mongoose";

const app = express();


const server = createServer(app);

//mongoose.Promise = global.Promise;
mongoose.connect("mongodb://andre:rocketsoketdb@mongo:27017/rocketsoket", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions).then((r) => {
    console.log('connection to database established 1')
  }).catch(err=>{
    console.log(`db error ${err}`);
  })



app.use(express.static(path.join(__dirname, "..","public")));

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket: ", socket.id);
})

app.get("/", (req, res) => {
  return res.json({
    message: "Hello WebSocket 2 "
  })
})

export { server, io }