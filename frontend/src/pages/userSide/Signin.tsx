import UserHeader from '../../components/users/UserHeader'
import SigninForm from '../../components/common/SigninForm'
function Signup() {

    return (
        <>
            <UserHeader/>
            <SigninForm role='user' signupUrl='/signup'/>
        </>
    )
}
  
export default Signup