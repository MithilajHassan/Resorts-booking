import UserHeader from '../../components/users/UserHeader'
import SignupForm from '../../components/common/SignupForm'
function Signup() {

    return (
        <>
            <UserHeader/>
            <SignupForm role='user' signinUrl='/signin' />
        </>
    )
}
  
export default Signup