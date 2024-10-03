import { useState } from "react"
import { FaBars, FaBook, FaHeart, FaTimes, FaWallet } from "react-icons/fa"
import { FaCircleUser } from "react-icons/fa6"
import { TbLogout } from "react-icons/tb"
import {HoverCard, HoverCardContent, HoverCardTrigger,  } from "../ui/hover-card"
import { Link, useNavigate } from "react-router-dom";
import { useSignoutUserMutation } from "../../slices/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { clearUserAuth } from "../../slices/authSlice"
import { useSelect } from "@material-tailwind/react"
import { AppDispatch, RootState } from "../../store"

function UserNav(){

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = ()=> setIsMenuOpen(!isMenuOpen)
    const [ signoutUser ] = useSignoutUserMutation()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state:RootState)=> state.auth)

    const logoutHandler = async()=>{
        try {
            await signoutUser(undefined)
            dispatch(clearUserAuth())
            navigate('/')
        } catch (err) {
            console.log(err)
        }
        
    }
    return (
        <nav className="bg-blue-800 h-16 flex fixed w-full top-0 z-10">
             <div className="flex items-center mx-4 sm:mx-8 lg:mx-14">
                <p className="text-white font-bold italic font-serif text-xl sm:text-2xl">RESORTS</p>
            </div>
            {userInfo && (
                <>
                    <div className="flex items-center ml-auto mr-4 md:hidden lg:hidden z-20">
                <button onClick={toggleMenu} className="text-white focus:outline-none text-2xl">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <div className="hidden md:block lg:block grow">
                <ul className="list-none flex flex-col md:flex-row lg:flex-row gap-4 sm:gap-6 lg:gap-10
                 items-center justify-end text-white mr-4 sm:mr-8 lg:mr-10 h-16">
                    <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                        <FaBook />
                        <span>Bookings</span>
                    </li>
                    <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                        <FaHeart />
                        <span>Wishlist</span>
                    </li>
                    <HoverCard>
                        <HoverCardTrigger>
                            <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                                <FaCircleUser />
                                <span>Account</span>
                            </li>
                        </HoverCardTrigger>
                        <HoverCardContent>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <Link to={''} className="flex items-center gap-1 px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <FaWallet /> Wallet
                                </Link>
                            </li>
                        
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

            <div className={`fixed top-0 left-0 h-full w-64 bg-white transform
             ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-20`} >
                <ul className="list-none flex flex-col gap-6 items-start pl-6 pt-20 text-blue-800">
                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                    <FaCircleUser />
                    <span>Account</span>
                </li>
                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                    <FaBook />
                    <span>Bookings</span>
                </li>
                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                    <FaWallet />
                    <span>Wishlist</span>
                </li>
                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                    <FaHeart />
                    <span>Wallet</span>
                </li>
                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black" onClick={logoutHandler}>
                <TbLogout />
                    <span>Sign Out</span>
                </li>
                </ul>
            </div>

            {isMenuOpen && (
                <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={toggleMenu}
                ></div>
            )}
                </>
            )}
        </nav>
    )
}

export default UserNav