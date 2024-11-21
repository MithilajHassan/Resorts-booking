import couponRepository from '../repositories/couponRepository';
import { ICoupon } from '../models/couponModel';
import CustomError from '../errors/customError';

class CouponService {

    async createCoupon(data: Partial<ICoupon>): Promise<ICoupon> {

        const existingCoupon = await couponRepository.findOne({ code: data.code });
        if (existingCoupon) {
            throw new CustomError('Coupon code already exists',409)
        }
        return await couponRepository.create(data);
    }


    async getCouponById(id: string): Promise<ICoupon | null> {
        const coupon = await couponRepository.findById(id);
        if (!coupon) {
            throw new CustomError('Coupon not found',404)
        }
        return coupon
    }


    async getAllCoupons(): Promise<ICoupon[]> {
        return await couponRepository.findAll();
    }


    async updateCoupon(id: string, updateData: Partial<ICoupon>): Promise<ICoupon | null> {

        return await couponRepository.update(id, updateData);
    }

    async deleteCoupon(id: string): Promise<ICoupon | null> {
        const coupon = await couponRepository.findById(id);
        if (!coupon) {
            throw new Error('Coupon not found');
        }
        return await couponRepository.delete(id);
    }
}

export default new CouponService();
