import { Link } from 'react-router-dom'
import ResortHeader from '../../components/resort/Header'
import Dashboard from '../../components/resort/Dashboard'
import Sidebar, { SidebarItem } from '../../components/common/Sidebar'
import { MdOutlineBedroomParent, MdOutlineDashboard } from 'react-icons/md'
import { GiBlockHouse } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { FaBook } from 'react-icons/fa'

const ResortDashboard = () => {
    const { resortAdmin } = useSelector((state: RootState) => state.auth)
    return (
        <>
            <ResortHeader />
            <div className="flex">
                <Sidebar adminName={resortAdmin?.name!} adminEmail={resortAdmin?.email!} >
                    <SidebarItem icon={<MdOutlineDashboard />} text="Dashboard" active={true} />
                    <Link to={'/resort/myresort'}><SidebarItem icon={<GiBlockHouse />} text="My Resort" /></Link>
                    <Link to={'/resort/rooms'}><SidebarItem icon={<MdOutlineBedroomParent />} text="Rooms" /></Link>
                    <Link to={'/resort/bookings'}><SidebarItem icon={<FaBook />} text="Bookings" /></Link>
                </Sidebar>

                <Dashboard />
            </div>
        </>
    )
}

export default ResortDashboard