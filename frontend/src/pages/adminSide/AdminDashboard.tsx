import AdminHeader from "../../components/admin/AdminHeader"
import Sidebar, { SidebarItem } from '../../components/admin/Sidebar'
import { MdOutlineCategory } from "react-icons/md"

const AdminDashboard = ()=>{

    return (
        <>
            <AdminHeader />
            <div className="flex">
            <Sidebar>
                <SidebarItem icon={<MdOutlineCategory/>} text="Categories" active={true} />
                <SidebarItem icon={<MdOutlineCategory/>} text="Categories"  />
                <SidebarItem icon={<MdOutlineCategory/>} text="Categories"  />
                <SidebarItem icon={<MdOutlineCategory/>} text="Categories"  />
                <SidebarItem icon={<MdOutlineCategory/>} text="Categories"  />
            </Sidebar>
            <p className="text-center text-2xl mt-52">Admin Dashboard</p>
            </div>
        </>
    )
}

export default AdminDashboard