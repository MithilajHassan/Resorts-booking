import Conversation, { IConversation } from "../models/conversationModel";

export default new class ConversationRepository {
    async createConversation(participants: IConversation["participants"]): Promise<IConversation> {
        const conversation = new Conversation({ participants });
        return conversation.save()
    }

    async getConversationsByParticipants(participants: IConversation["participants"]): Promise<IConversation | null> {
        return Conversation.findOne({
            participants:{$all:participants}
        }).populate('messages')
    }

    async addMessageToConversation(conversationId: string, messageId: string): Promise<IConversation | null> {
        return Conversation.findByIdAndUpdate(
            conversationId,
            { $push: { messages: messageId } },
            { new: true }
        );
    }

    async getConversationsByParticipantId(participantId: string): Promise<IConversation[]> {
        return Conversation.find({
            participants: { $elemMatch: { participantId } },
        });
    }
}