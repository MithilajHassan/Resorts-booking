import Booking, { IBooking } from './../models/bookingModel';

export default new class BookingRepository {
    async createBooking(BookingData: IBooking): Promise<IBooking> {
        const newBooking = new Booking(BookingData)
        return await newBooking.save()
    }

    async findBookingById(id: string): Promise<IBooking | null> {
        return await Booking.findById(id).populate('userId').populate('resortId').populate('roomId')
    }

    async findByUserId(id: string): Promise<IBooking[] | null> {
        return await Booking.find({userId:id}).populate('resortId').populate('roomId')
    }

    async findByResortId(id: string): Promise<IBooking[] | null> {
        return await Booking.find({userId:id}).populate('userId').populate('roomId')
    }

    async findAll(): Promise<IBooking[] | []> {
        return await Booking.find()
    }

    async editBooking(BookingData: IBooking, id: string): Promise<IBooking | null> {
        return await Booking.findByIdAndUpdate(id, { $set: BookingData }, { new: true })
    }

    async setPaymentStatus(id:string, status:boolean): Promise<IBooking | null> {
        return await Booking.findByIdAndUpdate(id, { $set: {paymentStatus:status} }, { new: true })
    }

}