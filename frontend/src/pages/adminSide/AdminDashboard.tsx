import { FaUsers } from "react-icons/fa"
import { GiBlockHouse } from "react-icons/gi"
import Sidebar, { SidebarItem } from '../../components/admin/Sidebar'
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md"
import AdminHeader from "../../components/admin/AdminHeader"
import { FaBox } from "react-icons/fa6"
import { Link } from "react-router-dom"

const AdminDashboard = ()=>{

    return (
        <>
            <AdminHeader />
            <div className="flex">
            <Sidebar>
                <SidebarItem icon={<MdOutlineDashboard/>} text="Dashboard" active={true} />
                <SidebarItem icon={<FaUsers/>} text="Users"  />
                <SidebarItem icon={<GiBlockHouse/>} text="Resorts"  />
                <Link to={'/admin/categories'}><SidebarItem icon={<MdOutlineCategory/>} text="Categories" /></Link>
                <SidebarItem icon={<FaBox />} text="Facilities"  />
            </Sidebar>
            <p className="text-center text-2xl mt-52">Admin Dashboard</p>
            </div>
        </>
    )
}

export default AdminDashboard