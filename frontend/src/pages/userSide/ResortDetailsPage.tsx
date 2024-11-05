import UserHeader from '../../components/users/UserHeader'
import ResortDetails from '../../components/users/ResortDetails'
import SearchBar from '../../components/users/SearchBar'
import AvailableRooms from '../../components/users/AvailableRooms'
const ResortDetailsPage = () => {

    return (
        <>
            <UserHeader />
            <ResortDetails />
            <hr />
            <p className='my-5 text-blue-600 ms-5'>Select dates to see this property's availability</p>
            <SearchBar />

            <AvailableRooms />

        </>
    )
}

export default ResortDetailsPage