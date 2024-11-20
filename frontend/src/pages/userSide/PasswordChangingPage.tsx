import { FaBook, FaHeart, FaUserCircle, FaWallet } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import UserHeader from '../../components/users/UserHeader'
import ProfileSidebar from '../../components/users/ProfileSidebar';
import ChangePasswordForm from '../../components/users/ChangePasswordForm';

export default function PasswordChangingPage() {

  return (
    <>
      <UserHeader />
      <div className='pt-16 flex items-center justify-center min-h-screen'>
        <ChangePasswordForm />
      </div>
    </>
  )
}