import { useGetUserQuery } from "../../../slices/userApiSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../../slices/authSlice"
import { RootState } from "../../../store"
import SearchBar from "../SearchBar"

const SearchSection = () => {
    const { data: user } = useGetUserQuery(undefined)
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (user?._id && !userInfo) {
            dispatch(setCredentials(user))
        }
    }, [user])

    return (
        <section
            style={{ backgroundImage: "url('/images/Resort-bg.jpg')" }}
            className="min-h-64 mb-2 flex flex-col justify-center"
        >
            <h1 className="text-2xl font-bold text-white ms-3">Best resorts in Kerala</h1>
            <h2 className="text-md font-semibold text-white ms-3">Find the resorts that appeal to you the most</h2>
           <div className="flex justify-start h-14 ms-3">

            <SearchBar redirect="/search" />
           </div>

        </section>
    )
}

export default SearchSection