import { Routes, Route } from 'react-router-dom';
import ResortSignup from '../pages/resortSide/SignupPage';
import ResortSignin from '../pages/resortSide/ResortSignin';
import ResortDashboard from '../pages/resortSide/ResortDashboard';
import MyResortDetailsPage from '../pages/resortSide/MyResortDetailsPage';
import NotFound from '../components/common/404';
import ResortPrivateRoutes from '../components/resort/ResortPrivateRoutes'

const ResortRoutes = () => {
    return (
        <Routes>
            <Route path='/signup' element={<ResortSignup />} />
            <Route path='/signin' element={<ResortSignin />} />
            <Route path='' element={<ResortPrivateRoutes />} >
                <Route path='/dashboard' element={<ResortDashboard />} />
                <Route path='/myresort' element={<MyResortDetailsPage />} />
                <Route path='/rooms' element={<MyResortDetailsPage />} />

            </Route>

            <Route path='*' element={<NotFound baseRoute="/resort/dashboard" />} />
        </Routes>
    );
};

export default ResortRoutes;