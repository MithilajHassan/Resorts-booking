import { AppDispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { clearAdminAuth } from "../../slices/authSlice"
import { FaCircleUser } from "react-icons/fa6"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../ui/hover-card"
import { useNavigate } from "react-router-dom"
import { TbLogout } from "react-icons/tb"
import { useSignoutAdminMutation } from "../../slices/authApiSlice"

function AdminHeader() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [adminSignout] = useSignoutAdminMutation()
    const { adminInfo } = useSelector((state: RootState) => state.auth)
    const logoutHandler = async () => {
        try {
            await adminSignout(undefined)
            dispatch(clearAdminAuth())
            navigate('/admin/signin')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <nav className="bg-blue-800 h-16 flex fixed w-full top-0 z-10">
            <div className="flex items-center mx-4 sm:mx-8 lg:mx-14">
                <p className="text-white font-bold italic font-serif text-xl sm:text-2xl">RESORTS</p>
            </div>
            {adminInfo && (
                <div className="grow">
                    <ul className="flex flex-row gap-4 
                 items-center justify-end text-white mr-10 h-16">
                        <HoverCard>
                            <HoverCardTrigger>
                                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                                    <FaCircleUser />
                                    <span>Account</span>
                                </li>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li className="">
                                        <p onClick={logoutHandler} className="flex items-center gap-1 px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <TbLogout />Sign Out
                                        </p>
                                    </li>
                                </ul>
                            </HoverCardContent>
                        </HoverCard>
                    </ul>
                </div>
            )}

        </nav>
    )
}

export default AdminHeader