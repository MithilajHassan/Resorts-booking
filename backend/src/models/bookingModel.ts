import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    resortId: mongoose.Types.ObjectId;
    roomId: mongoose.Types.ObjectId;
    guestName: string;
    guestPhone: number;
    guestEmail: string;
    checkInDate: Date;
    checkOutDate: Date;
    checkInTime: string;
    checkOutTime: string;
    totalPrice: number;
    paymentMethod: string;
    paymentStatus: boolean;
    transactionId?: string;
}

const BookingSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        resortId: { type: mongoose.Schema.Types.ObjectId, ref: "Resort", required: true },
        roomId: {type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
        guestName: { type: String, required: true },
        guestPhone: { type: Number, required: true },
        guestEmail: { type: String, required: true },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
        checkInTime: { type: String, required: true },
        checkOutTime: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        paymentStatus: { type: Boolean, default: false },
        transactionId: { type: String },
    },
    { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", BookingSchema)

export default Booking
