import ProfileSidebar from '../../components/users/ProfileSidebar'
import BookingsCard from '../../components/users/BookingsCard'
import UserHeader from '../../components/users/UserHeader'

function BookingsPage() {

    return (
        <>
            <UserHeader />
            <div className="flex justify-center w-full mt-20 px-16 space-x-4">
                <div className="w-1/5 hidden md:block">
                    <ProfileSidebar />
                </div>
                <div className="flex flex-grow">
                    <BookingsCard />
                </div>
            </div>
        </>
    )
}

export default BookingsPage