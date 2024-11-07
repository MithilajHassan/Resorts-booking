import UserProfile from '../../components/users/UserProfile';
import UserHeader from '../../components/users/UserHeader'

const UserProfilePage = () => {

  return (
    <>
      <UserHeader />
      <div className='pt-16 flex items-center justify-center min-h-screen'>
        <UserProfile />
      </div>
    </>
  );
}

export default UserProfilePage;
