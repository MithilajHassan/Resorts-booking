import BookingRepository from './../repositories/bookingRepository';
import { IBooking } from './../models/bookingModel';
import Razorpay from 'razorpay';


class BookingService {
    async createBooking(bookingData: IBooking): Promise<{orderId:string, amount:string|number, bookingId:string}> {
        const razorpay = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID!,
            key_secret:process.env.RAZORPAY_SECRET 
        })
        const booking = await BookingRepository.createBooking(bookingData)
        const response = await razorpay.orders.create({
            amount:booking.totalPrice * 100,
            currency:'INR',
            receipt:booking._id as string,
            payment_capture:true
        })
        
        return {orderId:response.id,amount:response.amount,bookingId:booking._id as string}
    }

    async setPaymentStatus(id:string, status:boolean): Promise<IBooking | null> {
        return await BookingRepository.setPaymentStatus(id,status)
    }

    async getBookingById(id: string): Promise<IBooking | null> {
        return await BookingRepository.findBookingById(id);
    }

    async getBookingsByUserId(userId: string): Promise<IBooking[] | null> {
        return await BookingRepository.findByUserId(userId);
    }

    async getBookingsByResortId(resortId: string): Promise<IBooking[] | null> {
        return await BookingRepository.findByResortId(resortId);
    }

    async getAllBookings(): Promise<IBooking[]> {
        return await BookingRepository.findAll();
    }

    async updateBookingStatus(id: string, status: string): Promise<IBooking | null> {
        return await BookingRepository.editBookingStatus(id, status );
    }
}

export default new BookingService()