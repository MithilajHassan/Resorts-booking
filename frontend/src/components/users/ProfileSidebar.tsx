import { ReactElement } from "react";
import { FaBook, FaHeart, FaUserCircle, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  children: ReactElement[]
}
// interface sidebarItem {
//   icon
// }

export default function ProfileSidebar({ children }: Props) {
  return (
    <div className="border rounded-md w-full">
      <ul className="list-none">
        {children}
        
      </ul>
    </div>
  )
}

// export function ProfileSidebarItem(){

//  return(

//  )
// }