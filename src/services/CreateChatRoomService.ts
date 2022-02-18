import { injectable } from "tsyringe";
import { ChatRoom } from "../schema/ChatRoom"


@injectable()
class CreateChatRoomService {

  async execute(idUsers: string[]){
    const room = await ChatRoom.create({
      idUsers
    });
    return room;
  }
}

export { CreateChatRoomService }