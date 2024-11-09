import { FaBook, FaHeart, FaUserCircle, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfileSidebar() {
  return (
    <div className="border rounded-md w-full">
        <ul className="list-none">
        <Link to={'/myprofile'}><li className="p-4 hover:bg-indigo-50"><span className="mx-auto flex items-center gap-2"><FaUserCircle />Profile</span></li></Link>
            <Link to={'/bookings'}><li className="p-4 border-y hover:bg-indigo-50"><span className="mx-auto flex items-center gap-2"><FaBook />Bookings</span></li></Link>
            <Link to={'/wishlist'}><li className="p-4 border-b hover:bg-indigo-50"><span className="mx-auto flex items-center gap-2"><FaHeart />Wishlist</span></li></Link>
            <Link to={'/wallet'}><li className="p-4 hover:bg-indigo-50"><span className="mx-auto flex items-center gap-2"><FaWallet />Wallet</span></li></Link>
        </ul>
    </div>
  )
}
