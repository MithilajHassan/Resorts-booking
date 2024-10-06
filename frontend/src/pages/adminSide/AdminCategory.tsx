import { FaUsers } from "react-icons/fa"
import { FaBox } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md"
import { GiBlockHouse } from "react-icons/gi"
import Sidebar, { SidebarItem } from '../../components/admin/Sidebar'
import AdminHeader from "../../components/admin/AdminHeader"
import CategoryManagement from "../../components/admin/CategoryManagement"


const AdminDashboard = ()=>{

    return (
        <>
            <AdminHeader />
            <div className="flex">
            <Sidebar>
                <Link to={'/admin/dashboard'}><SidebarItem icon={<MdOutlineDashboard/>} text="Dashboard" /></Link>
                <SidebarItem icon={<FaUsers/>} text="Users" />
                <SidebarItem icon={<GiBlockHouse/>} text="Resorts" />
                <SidebarItem icon={<MdOutlineCategory/>} text="Categories" active={true} />
                <SidebarItem icon={<FaBox />} text="Facilities" />
            </Sidebar>

            <CategoryManagement />
            
            </div>
        </>
    )
}

export default AdminDashboard