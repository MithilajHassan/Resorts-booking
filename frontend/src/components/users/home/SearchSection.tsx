import { useGetUserQuery } from "../../../slices/userApiSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../../slices/authSlice"
import { RootState } from "../../../store"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import Search from "../SearchBar"

const SearchSection = () => {
    const { data: user } = useGetUserQuery(undefined)
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    useEffect(() => {
        if (user?._id && !userInfo) {
            dispatch(setCredentials(user))
        }
    }, [user])

    const submitHandler = () => {
        console.log(search)
        
    }

    return (
        <section
            style={{ backgroundImage: "url('/images/Resort-bg.jpg')" }}
            className="min-h-64 mb-2 flex flex-col justify-center"
        >
            <h1 className="text-2xl font-bold text-white ms-3">Best resorts in Kerala</h1>
            <h2 className="text-md font-semibold text-white ms-3">Find the resorts that appeal to you the most</h2>
            <div className="flex items-center w-full max-w-md  space-x-1 mx-auto md:ms-3 ">
                <Input type="search" className="bg-white h-8 md:h-10" onChange={(e)=>setSearch(e.target.value)} placeholder="Where are you going?" />
                <Button onClick={submitHandler} className="bg-blue-700 hover:bg-blue-400 h-8 md:h-10" >Search</Button>
            </div>

        </section>
    )
}

export default SearchSection