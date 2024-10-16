import { UpdateWriteOpResult } from 'mongoose'
import Room, { IRoom } from '../models/roomModel'

export default new class RoomRepository {
    async createRoom(roomData: IRoom): Promise<IRoom> {
        const newRoom = new Room(roomData)
        return await newRoom.save()
    }

    async findRoomsByResortId(resortId: string): Promise<IRoom[] | null> {
        return await Room.find({ resortId, isDeleted: false })
    }

    async findRoomById(id: string): Promise<IRoom | null> {
        return await Room.findById(id)
    }

    async findRooms(id: String): Promise<IRoom[] | null> {
        return await Room.find({ resortId: id, isDeleted: false })
    }

    async editRoom(id: string, roomData: IRoom): Promise<IRoom | null> {
        return await Room.findByIdAndUpdate(id, { $set: roomData }, { new: true })
    }

    async deleteRoom(id:unknown):Promise<UpdateWriteOpResult>{
        return await Room.updateOne({_id:id},{$set:{isDeleted:true}})
    }

    async findByname(name: string, resortId: unknown): Promise<IRoom | null> {
        return await Room.findOne({ name: { $regex: '^' + name + '$', $options: 'i' }, resortId, isDeleted: false })
    }

}