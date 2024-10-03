import ResortHeader from '../../components/resort/Header'
import SigninForm from '../../components/common/SigninForm'
function Signin() {

    return (
        <>
            <ResortHeader/>
            <SigninForm role='resortAdmin' signupUrl='/resort/signup' nextPage='/resort/addresortdetails' />
        </>
    )
}
  
export default Signin