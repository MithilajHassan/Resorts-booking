import { useEffect } from "react"
import { Card, CardContent } from "../../ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel"
import { useDispatch, useSelector } from "react-redux"
import { SetBanner } from "../../../slices/bannerSlice"
import { RootState } from "../../../store"
import { useListBannersQuery } from "../../../slices/userApiSlice"


type Props = {}

export default function BannerSection({ }: Props) {
    const { data } = useListBannersQuery()
    const { banners } = useSelector((state: RootState) => state.banners)
    const dispatch = useDispatch()

    useEffect(() => {
        if (data) {
            dispatch(SetBanner(data))
        }
    }, [data])

    return (
        <div className="w-full px-14">
            <Carousel className="w-full ">
                <CarouselContent>
                    {banners.map((banner, index) => (
                        <CarouselItem key={index}>
                            <div
                                className="p-1 relative"
                                style={{
                                    backgroundImage: `url(${banner.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '300px', 
                                }}
                            >
                                <Card className="w-full h-full bg-black bg-opacity-0 rounded-none">
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-Black text-center">
                                        <h2 className="text-3xl font-semibold mb-2">{banner.title}</h2>
                                        <p className="font-semibold">{banner.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}