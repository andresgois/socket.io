import { container } from "tsyringe";
import { io } from "../http";
import { CreateUserService } from "../services/CreateUserService";
import { GetAllUsersService } from "../services/GetAllUsersService";

io.on("connect", (socket) => {
  
  socket.on("start", async (data) => {
    const { email, avatar, name } = data;
    const createUserService = container.resolve(CreateUserService);
    console.log('Data ',data)
    
    const user = await createUserService.execute({
      email,
      avatar,
      name,
      socket_id: socket.id
    })

    console.log(user);

    socket.broadcast.emit("new_users", user);

  });

  socket.on("get_users", async (callback) => {
    const getAllUsersService = container.resolve(GetAllUsersService);
    const users = await getAllUsersService.execute();

    callback(users);
  })
});


    // io.emit(); // Envia para todos, global
    //socket.emit(); // individual
    /*socket.emit("chat_iniciado", {
      message: "Seu chat foi inciado",
    });*/