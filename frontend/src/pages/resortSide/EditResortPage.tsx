import { Link } from 'react-router-dom'
import ResortHeader from '../../components/resort/Header'
import Sidebar, { SidebarItem } from '../../components/common/Sidebar'
import { MdOutlineBedroomParent, MdOutlineDashboard } from 'react-icons/md'
import { GiBlockHouse } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import EditResortForm from '../../components/resort/EditResortForm'
import { FaBook } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'


function EditResortDetails() {
    const { resortAdmin } = useSelector((state: RootState) => state.auth)
    return (
        <>
            <ResortHeader />
            <div className="flex">
                <Sidebar adminName={resortAdmin?.name!} adminEmail={resortAdmin?.email!} >
                    <Link to={'/resort/dashboard'}><SidebarItem icon={<MdOutlineDashboard />} text="Dashboard" /></Link>
                    <SidebarItem icon={<GiBlockHouse />} text="My Resort" active={true} />
                    <Link to={'/resort/rooms'}><SidebarItem icon={<MdOutlineBedroomParent />} text="Rooms" /></Link>
                    <Link to={'/resort/bookings'}><SidebarItem icon={<FaBook />} text="Bookings" /></Link>
                    <Link to={'/resort/messages'}><SidebarItem icon={<FaMessage />} text="Messages" /></Link>
                </Sidebar>

                <EditResortForm />
            </div>

        </>
    )
}

export default EditResortDetails