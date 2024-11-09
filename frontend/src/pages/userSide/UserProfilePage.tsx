import UserProfile from '../../components/users/UserProfile';
import UserHeader from '../../components/users/UserHeader'
import ProfileSidebar from '../../components/users/ProfileSidebar';

const UserProfilePage = () => {

  return (
    <>
      <UserHeader />
      <div className="flex w-full mt-20 px-16 space-x-4">
        <div className="w-1/5 hidden md:block ">
          <ProfileSidebar />
        </div>
        <div className="flex flex-grow">
          <UserProfile />
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
