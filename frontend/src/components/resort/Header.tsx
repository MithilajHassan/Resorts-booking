
import { FaCircleUser } from "react-icons/fa6";

function UserNav(){

    return (
        <nav className="bg-blue-800 h-16 flex fixed w-full top-0 z-10">
             <div className="flex items-center mx-4 sm:mx-8 lg:mx-14">
                <p className="text-white font-bold italic font-serif text-xl sm:text-2xl">RESORTS</p>
            </div>

            <div className="hidden md:block lg:block grow">
                <ul className="list-none flex flex-col md:flex-row lg:flex-row gap-4 sm:gap-6 lg:gap-10
                 items-center justify-end text-white mr-4 sm:mr-8 lg:mr-10 h-16">
                    <li className="flex items-center gap-2 hover:scale-110 transition-transform hover:text-black">
                        <FaCircleUser />
                        <span>Account</span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default UserNav