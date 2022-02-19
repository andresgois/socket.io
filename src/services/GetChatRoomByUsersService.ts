import { ObjectId } from "mongoose";
import { injectable } from "tsyringe";
import { ChatRoom } from "../schema/ChatRoom";


@injectable()
class GetChatRoomByUsersService {
// verifica se existe uma sala onde estão contidos os 2 idUsers
  async execute(idUsers: ObjectId[]){
    const room = await ChatRoom.findOne({
      idUsers: {
        $all: idUsers,
      }
    }).exec();

    return room;
  }
}

export { GetChatRoomByUsersService }