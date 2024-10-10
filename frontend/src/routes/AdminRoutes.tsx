import { Route, Routes } from "react-router-dom";
import AdminSigninPage from '../pages/adminSide/AdminSignin';
import AdminPrivateRoute from '../components/admin/AdminPrivateRoutes';
import AdminDashboard from '../pages/adminSide/AdminDashboard';
import AdminCategory from '../pages/adminSide/AdminCategory';
import AdminFacility from '../pages/adminSide/AdminFacility';
import AdminResortsList from '../pages/adminSide/ResortsList';
import UsersListPage from '../pages/adminSide/UsersListPage';
import NotFound from "../components/common/404";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/signin' element={<AdminSigninPage />} />

            <Route path='' element={<AdminPrivateRoute />}>
                <Route path='/dashboard' element={<AdminDashboard />} />
                <Route path='/categories' element={<AdminCategory />} />
                <Route path='/facilities' element={<AdminFacility />} />
                <Route path='/resorts' element={<AdminResortsList />} />
                <Route path='/users' element={<UsersListPage />} />


            </Route>
            <Route path='*' element={<NotFound baseRoute="/admin/signin" />} />
        </Routes>
    );
};

export default AdminRoutes;