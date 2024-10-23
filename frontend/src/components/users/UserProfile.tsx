import { useSelector } from 'react-redux';
import { RootState } from '../../store'; 

const UserProfile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
const defaultAvatar = '/public/images/defaultAvatar.jpg'

  return (
    
    <div className="w-full max-w-md mx-auto mt-30 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
      <div className="flex flex-col items-center">
          <img
            src={userInfo?.avatar || defaultAvatar}
            alt={userInfo?.name}
            className="w-24 h-24 rounded-full mb-4"
          />
        
        <h3 className="text-lg font-semibold">{userInfo?.name}</h3>
        <p className="text-gray-600">{userInfo?.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
