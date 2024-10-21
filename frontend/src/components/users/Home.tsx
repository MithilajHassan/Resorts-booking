import { Link } from "react-router-dom"
import { useGetUserQuery, useListResortsQuery } from "../../slices/userApiSlice"
import { Card, CardContent, } from "../ui/card"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../slices/authSlice"
import { RootState } from "../../store"

const Home = () => {
    const { data: resort = [] } = useListResortsQuery(undefined)
    const { data: user } = useGetUserQuery(undefined)
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (user?._id && !userInfo) {
            dispatch(setCredentials(user))
        }
    }, [user])

    return (
        <div className="mt-16">
            <section
                style={{ backgroundImage: "url('/images/Resort-bg.jpg')" }}
                className="min-h-64 mb-2"
            >

            </section>
            <section className="bg-white flex flex-wrap items-center justify-center gap-2">
                {
                    resort.map((item) => (
                        <Card className="w-1/5" key={item._id}>
                            <Link to={`/resortdetails/${item._id}`}>
                                <img src={item.images[0]} alt="" className="w-full h-52 rounded-t-xl" />
                                <CardContent className="p-1 mt-1">
                                    <p className="font-bold text-wrap">{item.resortName}</p>
                                    <p className="text-gray-500 text-sm mb-1">{item.city},India</p>
                                    <div className="bg-green-400 px-2 py-1 w-fit rounded mb-14"><p className="font-semibold text-sm">3.6</p></div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))
                }
            </section>
        </div>
    )
}

export default Home