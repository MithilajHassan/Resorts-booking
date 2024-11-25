import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Label } from "../../../components/ui/label"
import { useEffect, useState } from "react"
import { useListCouponsMutation } from "../../../slices/userApiSlice"
import { setCoupon } from "../../../slices/couponSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { toast } from "react-toastify"
import { IBooking } from "@/types/types"
import { setCheckout } from "../../../slices/checkoutSlice"


type Props = {
    checkoutDetails: IBooking
}

export default function CouponSection({ checkoutDetails }: Props) {
    const [code, setCode] = useState<string>('')
    const [listCoupons] = useListCouponsMutation()
    const { coupons } = useSelector((state: RootState) => state.coupons)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const res = await listCoupons({ price: checkoutDetails.totalPrice }).unwrap()
                if (res.success) {
                    dispatch(setCoupon(res.data))
                }
            } catch (err) {
                console.log(err);
            }
        })()
    }, [])

    const handleApply = () => {
        if (code.trim() == '') {
            toast('Enter coupon code') 
            return
        }
        const coupon = coupons.find(item => code == item.code)
        console.log(checkoutDetails);
        
        if (coupon?.minBooking! <= checkoutDetails.totalPrice) {
            const discount:number = Math.floor((checkoutDetails.totalPrice * coupon?.discount!)/100)
            dispatch(setCheckout({
                userId: checkoutDetails.userId,
                resortId: checkoutDetails.resortId,
                roomId: checkoutDetails.roomId,
                guestName: checkoutDetails.guestName,
                guestEmail: checkoutDetails.guestEmail,
                guestPhone: checkoutDetails.guestPhone,
                guestCount: checkoutDetails.guestCount,
                checkInTime: checkoutDetails.checkInTime,
                checkOutTime: checkoutDetails.checkOutTime,
                checkInDate: checkoutDetails.checkInDate,
                checkOutDate: checkoutDetails.checkOutDate,
                paymentMethod: checkoutDetails.paymentMethod,
                totalPrice: checkoutDetails.totalPrice - discount,
                discount: discount,
            }))
            setCode('')
        }else{
            toast('Coupon not valid')
        }
    }

    return (
        <div>
            <div className="flex justify-center mb-2">
                <Dialog>
                    <DialogTrigger>
                        <Button className="bg-blue-600" size={'sm'} >Show Available coupons</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Coupons
                            </DialogTitle>
                        </DialogHeader>
                        <div className="">
                            <div className="flex justify-around border-2 my-2">
                                <p className="font-bold">Code</p>
                                <p className="font-bold">Discount</p>
                            </div>
                            {coupons.map((item) => (
                                <div className="flex justify-around border-2 my-2">
                                    <p className="text-center">{item.code}</p>
                                    <p className="text-center">{item.discount}%</p>
                                </div>
                            ))}
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
            <div className="mx-2 mt-4 flex flex-col items-center">
                <div className="w-full">
                    <Label className="">Coupon Code</Label>
                    <Input className="bg-blue-50" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter coupon code" />
                </div>
                <Button onClick={()=>handleApply()} className="bg-green-600 mt-2" size={'sm'}>Apply</Button>
            </div>
        </div>

    )
}