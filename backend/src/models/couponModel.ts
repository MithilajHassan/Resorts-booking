import mongoose, { Schema, Document } from 'mongoose';


export interface ICoupon extends Document {
  code: string;
  couponType: string;
  discount: number;
  limit: number;
  createdAt: Date;
  expireAt: Date;
}

const CouponSchema: Schema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true },
  couponType: { type: String, required: true },
  discount: { type: Number, required: true },
  limit: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, required: true },
});

const Coupon = mongoose.model<ICoupon>('Coupon', CouponSchema);

export default Coupon;
