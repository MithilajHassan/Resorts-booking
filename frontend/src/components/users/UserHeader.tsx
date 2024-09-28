import { useState } from "react";
import { FaBars, FaBook, FaTimes } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

function UserNav(){
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = ()=> setIsMenuOpen(!isMenuOpen)
    return (
        <nav className="bg-blue-800 h-16 flex fixed w-full top-0 z-10">
             <div className="flex items-center mx-4 sm:mx-8 lg:mx-14">
                <p className="text-white font-bold italic font-serif text-xl sm:text-2xl">RESORTS</p>
            </div>

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
                    <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                        <FaCircleUser />
                        <span>user1</span>
                    </li>
                </ul>
            </div>

            <div className={`fixed top-0 left-0 h-full w-64 bg-white transform
             ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-20`} >
                <ul className="list-none flex flex-col gap-6 items-start pl-6 pt-20 text-blue-800">
                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                    <FaBook />
                    <span>Bookings</span>
                </li>
                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                    <FaHeart />
                    <span>Wishlist</span>
                </li>
                <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                    <FaCircleUser />
                    <span>user1</span>
                </li>
                </ul>
            </div>

            {isMenuOpen && (
                <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={toggleMenu}
                ></div>
            )}
        </nav>
    )
}

export default UserNav