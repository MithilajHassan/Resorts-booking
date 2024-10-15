import { Routes, Route } from 'react-router-dom';
import ResortSignup from '../pages/resortSide/SignupPage';
import ResortSignin from '../pages/resortSide/ResortSignin';
import ResortDashboard from '../pages/resortSide/ResortDashboard';
import MyResortDetailsPage from '../pages/resortSide/MyResortDetailsPage';
import NotFound from '../components/common/404';
import ResortPrivateRoutes from '../components/resort/ResortPrivateRoutes';
import EditResortDetails from '../pages/resortSide/EditResortPage';
import ListRoomsPage from '../pages/resortSide/ListRoomsPage';
import AddRoomPage from '../pages/resortSide/AddRoomPage';

const ResortRoutes = () => {
    return (
        <Routes>
            <Route path='/signup' element={<ResortSignup />} />
            <Route path='/signin' element={<ResortSignin />} />
            <Route path='' element={<ResortPrivateRoutes />} >
                <Route path='/dashboard' element={<ResortDashboard />} />
                <Route path='/myresort' element={<MyResortDetailsPage />} />
                <Route path='/myresort/update' element={<EditResortDetails />} />
                <Route path='/rooms' element={<ListRoomsPage />} />
                <Route path='/rooms/add' element={<AddRoomPage />} />


            </Route>

            <Route path='*' element={<NotFound baseRoute="/resort/dashboard" />} />
        </Routes>
    );
};

export default ResortRoutes;