import { FaUsers } from "react-icons/fa"
import { GiBlockHouse } from "react-icons/gi"
import Sidebar, { SidebarItem } from '../../components/common/Sidebar'
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md"
import AdminHeader from "../../components/admin/AdminHeader"
import { FaBox } from "react-icons/fa6"
import { Link } from "react-router-dom"
import FacilityManagement from "../../components/admin/FacilityManagement"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

const AdminFacility = () => {
    const { adminInfo } = useSelector((state: RootState) => state.auth)
    return (
        <>
            <AdminHeader />
            <div className="flex">
                <Sidebar adminName={adminInfo?.name!} adminEmail={adminInfo?.email!} >
                    <Link to={'/admin/dashboard'}><SidebarItem icon={<MdOutlineDashboard />} text="Dashboard" /></Link>
                    <Link to={'/admin/users'}><SidebarItem icon={<FaUsers />} text="Users" /></Link>
                    <Link to={'/admin/resorts'}><SidebarItem icon={<GiBlockHouse />} text="Resorts" /></Link>
                    <Link to={'/admin/categories'}><SidebarItem icon={<MdOutlineCategory />} text="Categories" /></Link>
                    <SidebarItem icon={<FaBox />} text="Facilities" active={true} />
                </Sidebar>

                <FacilityManagement />

            </div>
        </>
    )
}

export default AdminFacility