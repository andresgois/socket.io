import { injectable } from "tsyringe";
import { Message } from "../schema/Message";


@injectable()
class GetMessageByChatRoomService {

  async execute(roomId: string) {
    const message = await Message.find({
      roomId, 
    }).populate("to").exec();

    return message;
  }
}

export { GetMessageByChatRoomService }