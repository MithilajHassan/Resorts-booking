import { Link } from 'react-router-dom'
import ResortHeader from '../../components/resort/Header'
import Sidebar, { SidebarItem } from '../../components/common/Sidebar'
import { MdOutlineBedroomParent, MdOutlineDashboard } from 'react-icons/md'
import { GiBlockHouse } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import AddRoom from '../../components/resort/AddRoom'


function AddRoomPage() {
    const { resortAdmin } = useSelector((state: RootState) => state.auth)
    return (
        <>
            <ResortHeader />
            <div className="flex">
                <Sidebar adminName={resortAdmin?.name!} adminEmail={resortAdmin?.email!} >
                    <Link to={'/resort/dashboard'}><SidebarItem icon={<MdOutlineDashboard />} text="Dashboard" /></Link>
                    <Link to={'/resort/myresort'}><SidebarItem icon={<GiBlockHouse />} text="My Resort" /></Link>
                    <SidebarItem icon={<MdOutlineBedroomParent />} text="Rooms" active={true} />

                </Sidebar>

                <AddRoom />
            </div>

        </>
    )
}

export default AddRoomPage