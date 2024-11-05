import { FaUsers } from "react-icons/fa"
import { GiBlockHouse } from "react-icons/gi"
import Sidebar, { SidebarItem } from '../../components/common/Sidebar'
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md"
import AdminHeader from "../../components/admin/AdminHeader"
import { FaBox } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { RootState } from "../../store"
import { useSelector } from "react-redux"

const AdminDashboard = () => {
    const { adminInfo } = useSelector((state: RootState) => state.auth)
    return (
        <>
            <AdminHeader />
            <div className="flex">
                <Sidebar adminName={adminInfo?.name!} adminEmail={adminInfo?.email!} >
                    <SidebarItem icon={<MdOutlineDashboard />} text="Dashboard" active={true} />
                    <Link to={'/admin/users'}><SidebarItem icon={<FaUsers />} text="Users" /></Link>
                    <Link to={'/admin/resorts'}><SidebarItem icon={<GiBlockHouse />} text="Resorts" /></Link>
                    <Link to={'/admin/categories'}><SidebarItem icon={<MdOutlineCategory />} text="Categories" /></Link>
                    <Link to={'/admin/facilities'}><SidebarItem icon={<FaBox />} text="Facilities" /></Link>
                </Sidebar>

                <p className="ml-72 text-2xl mt-72">Admin Dashboard</p>
                
            </div>
        </>
    )
}

export default AdminDashboard