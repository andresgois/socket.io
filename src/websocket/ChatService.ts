import { io } from "../http";

io.on("connect", (socket) => {
  // io.emit(); // Envia para todos, global
  //socket.emit(); // individual
  socket.emit("chat_iniciado", {
    message: "Seu chat foi inciado",
  });
});