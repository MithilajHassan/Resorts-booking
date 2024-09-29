import ResortHeader from '../../components/resort/Header'
import SignupForm from '../../components/common/SignupForm'
function SignupResort() {

    return (
        <>
            <ResortHeader/>
            <SignupForm role='resortAdmin' signinUrl='/resort/signin' />
        </>
    )
}
  
export default SignupResort