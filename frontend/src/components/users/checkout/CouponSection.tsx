import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Label } from "../../../components/ui/label"
import { useEffect, useState } from "react"
import { useListCouponsMutation } from "../../../slices/userApiSlice"
import { setCoupon } from "../../../slices/couponSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { Dialog } from "../../../components/ui/dialog"


type Props = {
    price:number
}

export default function CouponSection({ price }: Props) {
    const [show,setShow] = useState<boolean>(false)
    const [listCoupons] = useListCouponsMutation()
    const { coupons } = useSelector((state: RootState) => state.coupons)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const res = await listCoupons({price}).unwrap()
                if (res.success) {
                    dispatch(setCoupon(res.data))
                    console.log(res.data);           
                }
            } catch (err) {
                console.log(err);
            }
        })()
    }, [])

    return (
        <div>
                {/* <Dialog>
                </Dialog> */}
            <div className="flex justify-center mb-2">
                <Button className="bg-blue-600" size={'sm'} onClick={()=>setShow(true)} >Show Available coupons</Button>
            </div>
            <div className="mx-2 mt-4 flex flex-col items-center">
                <div className="w-full">
                    <Label className="">Coupon Code</Label>
                    <Input className="bg-blue-50" placeholder="Enter coupon code" />
                </div>
                <Button className="bg-green-600 mt-2" size={'sm'}>Apply</Button>
            </div>
        </div>

    )
}