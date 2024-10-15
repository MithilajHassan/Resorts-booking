import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/userSide/HomePage";
import UserSignup from "../pages/userSide/Signup";
import UserSignin from "../pages/userSide/Signin";
import ResortDetailsPage from "../pages/userSide/ResortDetailsPage";
import NotFound from "../components/common/404";
import UserPrivateRoutes from "../components/users/UserPrivateRoutes";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<UserSignup />} />
            <Route path='/signin' element={<UserSignin />} />
            <Route path='/resortdetails/:id' element={<ResortDetailsPage />} />
            
            <Route path="" element={<UserPrivateRoutes/>} >
                {/* <Route path='/Checkout' element={<CheckoutPage />} /> */}
            </Route>

            <Route path='*' element={<NotFound baseRoute="/" />} />
        </Routes>
    );
};

export default UserRoutes;