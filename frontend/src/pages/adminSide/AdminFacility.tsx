import { FaUsers } from "react-icons/fa"
import { GiBlockHouse } from "react-icons/gi"
import Sidebar, { SidebarItem } from '../../components/admin/Sidebar'
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md"
import AdminHeader from "../../components/admin/AdminHeader"
import { FaBox } from "react-icons/fa6"
import { Link } from "react-router-dom"
import FacilityManagement from "../../components/admin/FacilityManagement"

const AdminFacility = ()=>{
    
    return (
        <>
            <AdminHeader />
            <div className="flex">
            <Sidebar>
            <Link to={'/admin/dashboard'}><SidebarItem icon={<MdOutlineDashboard/>} text="Dashboard" /></Link>
                <SidebarItem icon={<FaUsers/>} text="Users"  />
                <SidebarItem icon={<GiBlockHouse/>} text="Resorts"  />
                <Link to={'/admin/categories'}><SidebarItem icon={<MdOutlineCategory/>} text="Categories" /></Link>
                <SidebarItem icon={<FaBox />} text="Facilities"  active={true} />
            </Sidebar>
            
            <FacilityManagement />

            </div>
        </>
    )
}

export default AdminFacility