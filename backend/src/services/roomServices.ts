import CustomError from '../errors/customError';
import resortRepository from '../repositories/resortRepository'
import { IRoom } from '../models/roomModel';
import roomRepository from '../repositories/roomRepository';

export default new class ResortService {

    async createRoom(roomData: IRoom): Promise<IRoom> {
        const exist = await roomRepository.findByname(roomData.name)
        if (exist) {
            throw new CustomError('Room is already exist', 409)
        }
        roomData.offerPrice = Math.floor((roomData.normalPrice * roomData.offerPercentage)/100)
        return await roomRepository.createRoom(roomData)
    }


    async getRoomsByResortId(roomId: string): Promise<IRoom[] | null> {
        return await roomRepository.findRoomsByResortId(roomId)
    }

}