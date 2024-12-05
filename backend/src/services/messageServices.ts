import { IMessage } from "../models/messageModel";
import conversationRepositroy from "../repositories/conversationRepositroy";
import messageRepository from "../repositories/messageRepository";

export default new class MessageServices {

    async sendMessage(messageData: IMessage): Promise<IMessage> {

        let conversation = await conversationRepositroy.getConversationsByParticipants([
            { participantId: messageData.senderId, participantType: messageData.senderType },
            { participantId: messageData.receiverId, participantType: messageData.receiverType }
        ])

        if (!conversation) {
            conversation = await conversationRepositroy.createConversation([
                { participantId: messageData.senderId, participantType: messageData.senderType },
                { participantId: messageData.receiverId, participantType: messageData.receiverType }
            ])
        }

        const newMessage = await messageRepository.createMessage(messageData)
        
        await conversationRepositroy.addMessageToConversation(conversation._id as string,newMessage._id as string)

        return newMessage;
    }

    
}